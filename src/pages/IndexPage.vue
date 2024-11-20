<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-img src="~/src/assets/logo.png.jpg" class="navbar-img q-mt-xs" /> 
          Blogging Page 
        </q-toolbar-title>

        <q-btn flat icon="more_vert" @click="dialogVisible = true" /> 
        
        <q-dialog v-model="dialogVisible" persistent>
          <q-card>
            <q-card-section>
              <div class="text-h6">Settings</div>
            </q-card-section>

            <q-list bordered>
              <q-item clickable v-ripple to="/" @click="dialogVisible = false"> 
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

            <q-card-actions align="right"> 
              <q-btn flat label="Close" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-toolbar>
    </q-header>

    <q-page class="flex flex-center">
      <div class="col-12 col-md-4 col-lg-4 q-pa-md login-container">
        <q-img src="~/src/assets/logo.png.jpg" class="q-mt-lg image "></q-img>
        <div class="text-h3 q-mb-xs">Blogging Page</div>
        <div class="text-grey q-mb-md">Please login into your account</div>

        <!-- Login Type Selector -->
        <q-select
          filled
          v-model="loginType"
          :options="loginOptions"
          label="Select Login Type"
          class="q-mb-md"
        />

        <div class="column">
          <!-- Input for email -->
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

          <!-- Input for password -->
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
              <q-icon 
                :name="showPassword ? 'visibility' : 'visibility_off'" 
                @click="togglePasswordVisibility" 
              />
            </template>
          </q-input>
        </div>

        <div class="column q-mt-md">
          <q-btn
            color="indigo"
            @click="submitLogin"
            label="Login"
            class="login-btn full-width"
            :size="$q.screen.gt.sm ? 'lg' : 'md'"
          />
        </div>

        <!-- Organization Dropdown (only shown after successful admin login) -->
        <div v-if="isAdminLoggedIn">
          <q-select
            filled
            v-model="selectedOrganization"
            :options="organizationOptions"
            label="Select Organization"
            class="q-mt-md"
          />
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';     // Import ref from Vue to create reactive variables
import { useRouter } from 'vue-router';     // Import the router to navigate to different pages

const router = useRouter();
const dialogVisible = ref(false);

const loginType = ref('');  /* Default login type set to empty */
const loginOptions = [
  { label: 'User Login', value: 'user' },
  { label: 'Admin Login', value: 'admin' },
];

// Define a reactive form object to hold the email and password fields, and error state
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

// Boolean to toggle password visibility
const showPassword = ref(false);
// Function to toggle the visibility of the password
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// Email validation function
const validateEmail = () => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const email = form.value.email.value;

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

// Password validation function
const validatePassword = () => {
  const password = form.value.password.value;

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

// Variable to track admin login state
const isAdminLoggedIn = ref(false); // Initially false, changes after successful admin login
const selectedOrganization = ref(''); // Holds selected organization

// Organizations for the dropdown
const organizationOptions = [
  { label: 'Doctors', value: 'doctors' },
  { label: 'Nurses', value: 'nurses' },
  { label: 'Physicians', value: 'physicians' },
];

// Function to submit the login form
const submitLogin = () => {
  validateEmail();
  validatePassword();

  if (form.value.email.error || form.value.password.error) {
    return;
  }

  if (loginType.value === 'admin') {
    // Admin login successful, set the flag to true
    isAdminLoggedIn.value = true;
    router.push('/admin-dashboard'); // Redirect to the admin dashboard
  } else {
    router.push('/home');  // Redirect to user home page
  }
};
</script>
