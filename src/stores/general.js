import { defineStore } from 'pinia';

const useGeneralStore = defineStore('general', {
    state: () => ({ 
        API_URL: 'http://228k123.e2.mars-hosting.com/'
    })
});

export default useGeneralStore;