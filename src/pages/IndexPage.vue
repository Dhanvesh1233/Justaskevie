<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> /* title and logo of page */
          <q-img src="~/src/assets/logo.png.jpg" class="navbar-img q-mt-xs" />
          Blogging Page 
        </q-toolbar-title>

          /* Dialog button for Settings */
        <q-btn flat icon="more_vert" @click="dialogVisible = true" />
        
         <q-dialog v-model="dialogVisible" persistent>
          <q-card>
            <q-card-section>
              <div class="text-h6">Settings</div> /*dialog header */
            </q-card-section>

            <q-list bordered>
              <q-item clickable v-ripple to="/" @click="dialogVisible = false"> /*navigation list items */
                <q-item-section>Home</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/about" @click="dialogVisible = false">
                <q-item-section>About</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/contact" @click="dialogVisible = false">
                <q-item-section>Contact</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/login" @click="dialogVisible = false">
                <q-item-section>Login</q-item-section>
              </q-item>
            </q-list>

            <q-card-actions align="right"> /*close button for dialog */
              <q-btn flat label="Close" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-toolbar>
    </q-header>
/*main page content */
    <q-page class="flex flex-center">
      <div class="col-12 col-md-4 col-lg-4 q-pa-md login-container">
        <q-img src="~/src/assets/logo.png.jpg" class="q-mt-lg image "></q-img>  /*logo img */
        <div class="text-h3 q-mb-xs">Blogging Page</div> /*page title */
        <div class="text-grey q-mb-md">Please login into your account</div>

        /* Login Type Selector (user or admin) */
        <q-select
          filled
          v-model="loginType"
          :options="loginOptions"
          label="Select Login Type"
          class="q-mb-md"
        />

        <div class="column"> /*email input field */
          <q-input
            outline
            label="Enter email*"
            v-model="form.email.value"
            :error="form.email.error"
            :error-message="form.email.msg"
            @blur="validateEmail"
          >
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>
/*password input field*/
          <q-input
            outline 
            label="Enter password*"      
            v-model="form.password.value"
            :error="form.password.error"
            :error-message="form.password.msg"
            :type="showPassword ? 'text' : 'password'"
            @blur="validatePassword"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              /*password toggle visibility icon */
              <q-icon 
                :name="showPassword ? 'visibility' : 'visibility_off'" 
                @click="togglePasswordVisibility" 
              />
            </template>
          </q-input>
        </div>
/*login button */
        <div class="column q-mt-md">
          <q-btn
            color="indigo"
            @click="submitLogin"
            label="Login"
            class="login-btn full-width"
            :size="$q.screen.gt.sm ? 'lg' : 'md'"
          />
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';/* for reactivity */
import { useRouter } from 'vue-router'; /* importing useRouter for navigation */

const router = useRouter();
const dialogVisible = ref(false); /*dialog visibility state */

const loginType = ref('');  /* Default login type set to empty */
const loginOptions = [
  { label: 'User Login', value: 'user' },
  { label: 'Admin Login', value: 'admin' },
];
/*form fields for mail and password including error handling */
const form = ref({
  email: {
    value: '',
    error: false,
    msg: '',
    required: true,
  },
  password: {
    value: '',
    error: false,
    msg: '',
    required: true,
  },
});
/*reactive state for toggling password */
const showPassword = ref(false);

/*Toggle the visibility of the password input field */
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

/*Function to validate email format using regex */
const validateEmail = () => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const email = form.value.email.value;

/*Check if the email is empty or does not match the pattern */
  if (!email) {
    form.value.email.error = true;
    form.value.email.msg = 'Email is required';
  } else if (!emailPattern.test(email)) {
    form.value.email.error = true;
    form.value.email.msg = 'Invalid email format';
  } else {
    form.value.email.error = false;
    form.value.email.msg = '';
  }
};
/*checking password length */
const validatePassword = () => {
  const password = form.value.password.value;

/*empty or shorter than 6 characters */
  if (!password) {
    form.value.password.error = true;
    form.value.password.msg = 'Password is required';
  } else if (password.length < 6) {
    form.value.password.error = true;
    form.value.password.msg = 'Password must be at least 6 characters long';
  } else {
    form.value.password.error = false;
    form.value.password.msg = '';
  }
};

/*Function to handle form submission and redirect based on login type */
const submitLogin = () => {
  validateEmail();
  validatePassword();

  if (form.value.email.error || form.value.password.error) {
    return;
  }

  if (loginType.value === 'admin') {
    
    router.push('/admin-dashboard');  /* if admin login*/
  } else {
    
    router.push('/home');  /* if user login*/
  }
};
</script>
