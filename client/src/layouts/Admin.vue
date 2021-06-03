<template>
  <div>
    <navbar />
    <main>
      <section class="relative w-full h-full py-16 min-h-screen">
        <div
          class="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
          :style="`background-image: url('${registerBg2}');`"
        ></div>
        <router-view />
      </section>
    </main>
  </div>
</template>
<script>
import Navbar from "@/components/Navbars/AdminNavbar.vue";
export default {
  name: "user-dashboard-page",
  components: {
    Navbar,
  },
};
</script>
