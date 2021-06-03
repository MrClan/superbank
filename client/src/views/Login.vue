<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-4/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
        >
          <div class="rounded-t mb-0 px-6 py-6">
            <div class="text-center mb-3">
              <h3 class="text-blueGray-700 text-lg font-bold">
                Login
              </h3>
            </div>
            <hr class="mt-6 border-b-1 border-blueGray-300" />
          </div>
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Email
                </label>
                <input
                  type="email"
                  v-on:keyup.enter="focusPwd"
                  v-model="email"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Email"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <input
                  ref="pwdInput"
                  type="password"
                  v-on:keyup.enter="login"
                  v-model="password"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Password"
                />
              </div>
              <div>
                <span class="ml-2 text-sm font-semibold text-red-500">
                  {{ errMsg }}
                </span>
              </div>

              <div class="text-center mt-6">
                <button
                  class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button"
                  @click="login"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="flex flex-wrap mt-6 relative">
          <div class="w-1/2">
            <a href="javascript:void(0)" class="text-blueGray-200">
              <small>Forgot password?</small>
            </a>
          </div>
          <div class="w-1/2 text-right">
            <router-link to="/auth/register" class="text-blueGray-200">
              <small>Create new account</small>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import apiHandler from "@/foundation/apiHandler";
import store from "@/state/store";
import jwt_decode from "jwt-decode";

export default {
  data() {
    return {
      email: "",
      password: "",
      errMsg: "",
    };
  },
  mounted() {
    apiHandler.logout();
  },
  methods: {
    login: function() {
      this.errMsg = "";
      if (!this.email || this.email.trim().length == 0) {
        this.errMsg = "Email required";
        return;
      }
      if (!this.password || this.password.trim().length == 0) {
        this.errMsg = "Password required";
        return;
      }
      const response = apiHandler
        .login(this.email, this.password)
        .then((response) => {
          try {
            const decodedToken = jwt_decode(store.state.token);
            if (decodedToken.access === "user") {
              this.$router.push("/user");
            } else {
              this.$router.push("/admin");
            }
            throw "Unexpected response from server.";
          } catch (error) {
            this.errMsg = `Something went wrong.${error}`;
          }
        })
        .catch((err) => {
          this.errMsg = err.message ? err.message : err;
        });
    },
    focusPwd: function() {
      this.$refs.pwdInput.focus();
    },
  },
};
</script>
