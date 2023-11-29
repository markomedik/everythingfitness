<template></template>

<script>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

export default {
  setup() {
    const router = useRouter();
    const auth = useAuthStore();

    router.push("/");
    alert("Successfully Logged Out");

    return {};
  },
};
</script>
