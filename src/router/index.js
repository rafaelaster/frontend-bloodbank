import { createRouter, createWebHistory } from 'vue-router';
// import HomeView from '../views/HomeView.vue';
import { useApplicationStore } from '@/stores/application.js';



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
          path: '/',
          name: 'home',
          // component: HomeView,
          component: () => import('@/views/Home.vue'),
      },
      {
          path: '/login',
          name: 'login',
          component: () => import('@/views/Login.vue') // Assuming you have a view component for login
      },
      {
          path: '/request',
          name: 'request',
          component: () => import('@/views/RequestView.vue'), // Assuming you have a view component for requests
          children: [
              {
                  path: '', // Matches `/request`
                  name: 'show-requests',
                  component: () => import('@/views/ShowRequests.vue') // Component to show requests

              },
              {
                  path: 'new', // Matches `/request/add`
                  name: 'new-request',
                  component: () => import('@/views/NewRequest.vue') // Component to add a new request
              },
    
              {
                  path: '/:requestId', // Matches `/request/{requestId}`
                  name: 'edit-request',
                  component: () => import('@/views/EditRequest.vue') // Component to enroll appointments
              },
              {
                  path: '/:requestId', // Matches `/request/{requestId}`
                  name: 'delete-request',
                  component: () => import('@/views/DeleteRequest.vue') // Component to get appointment requests
              }
          ]
      },
      {
          path: '/bloodtest',
          name: 'bloodtest',
          component: () => import('@/views/BloodTestView.vue'), // Assuming you have a view component for appointments
          children: [
              {
                  path: '/:requestId', // Matches `/appointment/add`
                  name: 'save-bloodtest',
                  component: () => import('@/views/SaveBloodTest.vue') // Component to add a new appointment
              },
              {
                  path: '/:requestId/:bloodtest_id', // Matches `/appointment/{appointmentId}`
                  name: 'edit-bloodtest',
                  component: () => import('@/views/EditBloodTest.vue') // Component to edit an appointment
              },
              {
                path: '/:requestId', // Matches `/appointment/add`
                name: 'show-bloodtest',
                component: () => import('@/views/ShowBloodTest.vue') // Component to add a new appointment
             },  
             {
                path: '/:requestId/new', // Matches `/appointment/add`
                name: 'new-bloodtest',
                component: () => import('@/views/NewBloodTest.vue') // Component to add a new appointment
             },  
          ]

      },
      {
          path: '/register',
          name: 'register',
          component: () => import('@/views/Register.vue') // Assuming you have a view component for login
      },
      {
        path: '/saveUser',
        name: 'saveUser',
        component: () => import('@/views/SaveUser.vue') // Assuming you have a view component for login
     },
     {
        path: '/users',
        name: 'showUsers',
        component: () => import('@/views/ShowUser.vue') // Assuming you have a view component for login
     },

     {
        path: '/user',
        name: 'user',
        component: () =>import('@/views/User.vue'),
        children: [
            {
                path: '/role/delete/:user_id/:role_id', // Matches `/appointment/add`
                name: 'DeleteRolefromUser',
                component: () => import('@/views/DeleteRolefromUser.vue') // Component to add a new appointment
            },
            {
                path: '/:requestId/:bloodtest_id', // Matches `/appointment/{appointmentId}`
                name: 'edit-bloodtest',
                component: () => import('@/views/EditBloodTest.vue') // Component to edit an appointment
            },
            {
              path: '/:user_id', // Matches `/appointment/add`
              name: 'show-user',
              component: () => import('@/views/ShowUser.vue') // Component to add a new appointment
           },  
           {
              path: '/:user_id', // Matches `/appointment/add`
              name: 'save-user',
              component: () => import('@/views/SaveUser.vue') // Component to add a new appointment
           },
           {
            path: '/role/add/:user_id/:role_id', // Matches `/appointment/add`
            name: 'addRoletoUseroodtest',
            component: () => import('@/views/AddRoletoUser.vue') // Component to add a new appointment
           },  
        
        ]
     }
     ]
});

router.beforeEach((to, from, next) => {
    const { isAuthenticated } = useApplicationStore();
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

    if (requiresAuth && !isAuthenticated) {
        console.log('user not authenticated. redirecting to /login');
        next('/login');
    } else {
        next();
    }
});

export default router;