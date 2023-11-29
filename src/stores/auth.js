// auth.js (Pinia store)
import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import useGeneralStore from '../stores/general.js';



export const useAuthStore = defineStore('auth', {
  
  state: () => ({
    isAuthenticatedState: false,userId: null, pictureId: null
  }),
  getters: {
    isAuthenticatedGetter: (state) => state.isAuthenticatedState,
    userIdGetter: (state) => state.userId,
    pictureIdGetter: (state) => state.pictureId,
    bodyIdGetter: (state) => state.bodyId
  },
  actions: {
    setAuthentication(isAuthenticated) {
      this.isAuthenticatedState = isAuthenticated;
    },
    setUserId(userId) {
      this.userId = userId;
    },
    setPictureId(pictureId) {
      this.pictureId = pictureId;
    },
    setBodyId(bodyId) {
      this.bodyId = bodyId;
    },
    async login(user) {
      const generalStore = useGeneralStore();
      try {
        
        const response = await axios.post(`${generalStore.API_URL}user/login`, user);
        
   
        const userRole = response.data.userRole;
        const userId = response.data.userInfo.user_id;
        const pictureId = response.data.userInfo.picture_id;
        const bodyId = response.data.userInfo.body_measurment_id;
        

       
        this.setAuthentication(true);
        this.setUserId(userId);
        this.setPictureId(pictureId);
        this.setBodyId(bodyId);

        return userRole; 
      } catch (error) {
        throw error.response.data.msg;
      }
    },


    
    async logout() {
      const generalStore = useGeneralStore();
      
      try {
        const response = await axios.post(`${generalStore.API_URL}user/logout`);

        
        this.setAuthentication(false);
        this.setUserId(null);
        this.setPictureId(null);
        this.setBodyId(null);

        return response.data.message;
      } catch (error) {
        
        throw error.response.data.message;
      }
    },
  },
});
