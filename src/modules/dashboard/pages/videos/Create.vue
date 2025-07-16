<template>
  <DashboardPageTitle
    :title="$t('global_dashboard.pages_title.videos-create')"
  />

  <div class="bg-white rounded-sm md:!rounded-3xl p-2 md:p-5">
    <DashboardVideoForm @submit="create" :isLoading="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { useGlobalVar } from "~/helpers/global-var";
import { useCRUD } from "~/modules/dashboard/services/videos";

const { create, isLoading } = useCRUD();
const { siteName } = useGlobalVar();

siteName("global_dashboard.pages_title.videos-create");
</script>
