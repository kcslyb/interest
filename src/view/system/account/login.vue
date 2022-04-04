<template>
  <index>
    <template v-slot:content>
      <div class="content">
        <div class="title custom-font">{{data.isLogin ? '登录' : '注册'}}</div>
        <div class="content">
          <cs-form ref="userForm" label-width="80px" v-model="data.userDto">
            <cs-form-item required label="用户名" prop="userName" :errorMsg="data.userNameMsg">
              <cs-input v-model="data.userDto.userName" @change="handleUserNameChange"></cs-input>
            </cs-form-item>
            <cs-form-item required label="密码" prop="password" :errorMsg="data.passwordMsg">
              <cs-input type="password" v-model="data.userDto.password" @change="handlePasswordChange"></cs-input>
            </cs-form-item>
          </cs-form>
        </div>
        <div class="footer">
          <cs-button class="custom-font" @click.stop="handleLogin">{{data.isLogin ? '登录' : '注册'}}</cs-button>
        </div>
        <div class="register">
          <span class="btn cs-pointer" @click.stop="handleSwitch">{{!data.isLogin ? '登录' : '注册'}}</span>
        </div>
      </div>
    </template>
  </index>
</template>

<script setup>
import Index from "../../index.vue";
import CsButton from "../../../components/package/button";
import CsForm from "../../../components/package/form/src/CsForm.vue";
import CsInput from "../../../components/package/form/src/items/CsInput.vue";
import CsFormItem from "../../../components/package/form/src/CsFormItem.vue";
import {computed, getCurrentInstance, reactive, ref} from "vue";
import TABLE from "../../../storage/table";
import CsStorage from "../../../storage/cs-storage";
import {useRouter} from "vue-router";
import CryptoUtils from "../../../components/lib/crypto-utils";
import {mapActions, mapGetters, useStore} from "vuex";
import {QUERY_ACCOUNT, QUERY_ROUTER} from "../../../store/mutation-types";
import getStateServer from "../../../state/state-serve";

const state = useStore()
const userForm = ref(null)

const data = reactive({
  isLogin: true,
  passwordMsg: '',
  userNameMsg: '',
  userDto: {
    userName: 'kcs',
    password: 'kcs'
  }
})

const router = useRouter()

const {proxy} = getCurrentInstance()

const handleUserNameChange = () => {
  if (!data.userDto.userName) {
    data.userNameMsg = ''
    const {value} = userForm
    value.submit()
    return
  }
  const csStorageServe = CsStorage.getInstance(TABLE.ACCOUNT)
  csStorageServe.queryPage({userName: data.userDto.userName}).then((res) => {
    const flag = res.code === 200 && res.data.length === 0
    if (data.isLogin) {
      data.userNameMsg = (flag ? '用户名不存在' : '')
    } else {
      data.userNameMsg = !flag ? '用户名已存在' : ''
    }
    const {value} = userForm
    value.submit()
  })
}

const changePassword = (password) => {
  return CryptoUtils.MD5(password)
}

const handlePasswordChange = () => {
  if (!data.userDto.userName) {
    data.userNameMsg = ''
    const {value} = userForm
    value.submit()
    return
  }
  if (!data.userDto.password) {
    data.passwordMsg = ''
    const {value} = userForm
    value.submit()
    return
  }
  const csStorageServe = CsStorage.getInstance(TABLE.ACCOUNT)
  csStorageServe.queryPage({...data.userDto, password: changePassword(data.userDto.password)}).then((res) => {
    const flag = res.code === 200 && res.data.length === 0
    if (data.isLogin) {
      data.passwordMsg = (flag ? '密码错误' : '')
    } else {
      data.passwordMsg = ''
    }
    const {value} = userForm
    value.submit()
  })
}

const handleSwitch = () => {
  data.isLogin = !data.isLogin
  handleUserNameChange()
  handlePasswordChange()
}

const handleLogin = () => {
  handleUserNameChange()
  handlePasswordChange()
  const {value} = userForm
  value.submit().then(() => {
    const csStorageServe = CsStorage.getInstance(TABLE.ACCOUNT)
    if (!data.isLogin) {
      csStorageServe.save({...data.userDto, password: changePassword(data.userDto.password)}).then((res) => {
        if (res.code === 200) {
          getStateServer('LogStateServe').commitSimpleLog(`${data.userDto.userName}注册成功`)
          proxy.$csNotify({msg: '注册成功'})
        }
      })
    } else {
      csStorageServe.queryPage(
          {...data.userDto,
          password: changePassword(data.userDto.password)}).then((res) => {
        const flag = res.code === 200 && Array.isArray(res.data) && res.data.length === 0
        data.passwordMsg = flag ? '密码错误' : ''
        value.submit()
        if (!flag) {
          const [user] = res.data.data
          CsStorage.getInstance('USERINFO').save(user).then(() => {
            mapActions([`account/${QUERY_ACCOUNT}`])[`account/${QUERY_ACCOUNT}`].call({$store: state})
                .then(() => {
                  getStateServer('LogStateServe').commitSimpleLog(`${data.userDto.userName}登录成功`)
                  router.push('/interest/home').catch(e => console.error(e))
            })
          })
        }
      })
    }
  })
}

const handleBack = () => {
  router.push('/').catch(e => console.error(e))
}

</script>

<style scoped lang="less">
.content {
  height: 100%;
  padding: 0 6%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .title {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;
  }

  .content {
    flex: auto;

    .link {
      margin-bottom: 5px;
      padding-bottom: 5px;
      border-bottom: 1px solid;
      font-size: 16px;
      cursor: pointer;
      text-align: left;

      &:hover {
        font-weight: bold;
      }
    }
  }

  .footer {
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
  }

  .register {
    width: 100%;
    font-size: 14px;
    text-align: right;
    line-height: 14px;

    .btn {
      &:hover {
        font-size: 14px;
        font-weight: bold;
        color: @default-active-color;
      }
    }

    .back {
      float: left;
    }
  }
}

</style>