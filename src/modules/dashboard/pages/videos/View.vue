<template>
  <DashboardPageTitle
    :title="$t('global_dashboard.pages_title.videos')"
    :buttons="buttons"
  />

  <LazyDashboardLayoutContent :fetch="videos">
    <template v-slot="{ data }">
      <DashboardDataTable
        :headers="headers"
        :items="data"
        :actions="actions"
        :loading="videos.pending.value"
      />
    </template>

    <template #outside="{ meta }">
      <div class="pagination items-center justify-center pb-sm" v-if="meta?.last_page > 1">
        <ClientOnly>
          <v-pagination
            v-model="page"
            :length="meta.last_page"
            :total-visible="5"
          />
        </ClientOnly>
      </div>
    </template>
  </LazyDashboardLayoutContent>
</template>

<script setup lang="ts">
import { useCRUD, useVideos } from "~/modules/dashboard/services/videos";
import { useI18n } from "vue-i18n";
import { useGlobalVar } from "~/helpers/global-var";

const { t } = useI18n();
const { remove } = useCRUD();
const videos = useVideos();
const { page } = videos;
const { siteName } = useGlobalVar();
siteName("global_dashboard.pages_title.videos");

const headers = [
  { title: t("global.title"), key: "title", sortable: false },
  { title: t("global.video_url"), key: "video_url", sortable: false },
  { title: t("global.status"), key: "status", sortable: false },
  { title: t("global.is_main"), key: "is_main", sortable: false },
  { title: t("global.created_at"), key: "created_at", sortable: true },
];

const actions = (item: any, index: number, data: any[]) => [
  {
    icon: "mdi-pencil",
    to: { name: "videos-edit", params: { id: item.id } },
  },
  {
    icon: "mdi-delete",
    click: () => remove(item.id).then(() => data.splice(index, 1)),
  },
];

const buttons = [
  {
    to: { name: "videos-create" },
    icon: "mdi-plus",
    text: t("global_dashboard.pages_title.videos-create"),
  },
];
</script>
