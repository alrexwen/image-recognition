<template>
    <div>
        <a style="width: 100%;margin-top: 24px" size="large" @click="showModal">
            注册
        </a>
        <a-modal
                title="注册"
                :visible="visible"
                :confirm-loading="confirmLoading"
                @ok="handleOk"
                @cancel="handleCancel"
        >
            <a-form-item>
                <a-input
                        autocomplete="autocomplete"
                        size="large"
                        v-model="formInline.username"
                        placeholder="请输入用户名"
                >
                    <a-icon slot="prefix" type="user" />
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-input
                        size="large"
                        autocomplete="autocomplete"
                        type="password"
                        placeholder="请输入密码"
                        v-model = "formInline.password"
                >
                    <a-icon slot="prefix" type="lock" />
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-input
                        size="large"
                        autocomplete="autocomplete"
                        type="password"
                        placeholder="请再次输入密码"
                        v-model = "formInline.password1"
                >
                    <a-icon slot="prefix" type="lock" />
                </a-input>
            </a-form-item>
        </a-modal>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        formInline: {
          user: '',
          password: '',
          password1: '',
        },
        visible: false,
        confirmLoading: false,
      };
    },
    methods: {
      showModal() {
        this.visible = true;
      },
      handleOk() {
        if (this.formInline.username === '' || this.formInline.password === '') {
          alert('账号或密码不能为空');
        }else {
          this.confirmLoading = true;
          setTimeout(() => {
            this.visible = false;
            this.confirmLoading = false;
          }, 2000);
        }

      },
      handleCancel() {
        this.visible = false;
      },
    },
  };
</script>
