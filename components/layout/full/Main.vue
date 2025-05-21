<script setup lang="ts">
import { ref, shallowRef } from "vue";
import sidebarItems from "@/components/layout/full/vertical-sidebar/sidebarItem";
import { Menu2Icon } from "vue-tabler-icons";
const sidebarMenu = shallowRef(sidebarItems);
const sDrawer = ref(true);
</script>

<template>
  <!------Sidebar-------->
  <v-navigation-drawer
    left
    elevation="0"
    app
    class="leftSidebar no-scrollbar"
    v-model="sDrawer"
    width="270"
    style="overflow:visible;"
  >
    <!---Logo part -->
    <!-- <div class="pa-5">
      <LayoutFullLogo />
    </div> -->
    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <div style="height:100%;display:flex;flex-direction:column;">
      <v-list class="pa-6" style="flex:1 1 auto;overflow:visible;">
        <!---Menu Loop -->
        <template v-for="(item, i) in sidebarMenu">
          <!---Item Sub Header -->
          <LayoutFullVerticalSidebarNavGroup
            :item="item"
            v-if="item.header"
            :key="item.title"
          />

          <!---If Has Child -->
          <LayoutFullVerticalSidebarNavCollapse
            class="leftPadding"
            :item="item"
            :level="0"
            v-else-if="item.children"
          />

          <!---Single Item-->
          <LayoutFullVerticalSidebarNavItem
            :item="item"
            v-else
            class="leftPadding"
          />
          <!---End Single Item-->
        </template>
      </v-list>
      <!-- <div class="pa-4">
        <LayoutFullVerticalSidebarExtraBox />
      </div> -->
    </div>
  </v-navigation-drawer>
  <!------Header-------->
  <v-app-bar elevation="0" height="70" class="top-header">
    <div class="d-flex align-center justify-space-between w-100">
      <div>
        <v-btn
          class="hidden-lg-and-up ms-md-3 ms-sm-5 ms-3 text-muted"
          @click="sDrawer = !sDrawer"
          icon
          variant="flat"
          size="small"
        >
          <Menu2Icon size="20" stroke-width="1.5" />
        </v-btn>
        <!-- Notification -->
        <LayoutFullVerticalHeaderNotificationDD />
      </div>
      <div>
        <!-- Upgrade button -->
        <!-- <v-btn
          class="mr-2 bg-primary"
          href="https://adminmart.com/product/modernize-nuxt-js-admin-dashboard/?ref=56#product-demo-section"
          target="_blank"
          >Check Pro Template</v-btn
        > -->
        <!-- User Profile -->
        <LayoutFullVerticalHeaderProfileDD />
      </div>
    </div>
  </v-app-bar>
</template>

<style scoped>
.leftSidebar {
  overflow: visible !important;
}

.leftSidebar .v-list {
  flex: 1 1 auto;
  overflow: visible !important;
  padding-top: 8px !important;
  padding-bottom: 8px !important;
}

.leftSidebar .v-list-item,
.leftSidebar .v-list-item--link {
  min-height: 32px !important;
  height: 32px !important;
  padding-top: 2px !important;
  padding-bottom: 2px !important;
  font-size: 14px !important;
  line-height: 1.2 !important;
}

.leftSidebar .v-list-item__content {
  padding-left: 12px !important;
  padding-right: 8px !important;
}

.leftSidebar .v-list-subheader {
  font-size: 13px !important;
  padding-top: 8px !important;
  padding-bottom: 4px !important;
  letter-spacing: 0.04em;
}

.leftSidebar.no-scrollbar {
  overflow: visible !important;
}
</style>
