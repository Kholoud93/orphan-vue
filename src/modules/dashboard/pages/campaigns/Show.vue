<template>
  <LazyDashboardLayoutContent :fetch="campaign">
    <template #header="data">
      <DashboardPageTitle
        :title="data.name"
        :subTitle="$t('global_dashboard.pages_title.campaigns-show')"
        :buttons="buttons(data)"
      />
    </template>

    <template v-slot="data">
      <div class="max-w-3xl mx-auto">
        <div class="overflow-hidden rounded-xl mb-6">
          <img
            :src="data.image"
            alt="Card Image"
            class="h-80 w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <h3
          class="text-2xl font-semibold text-gray-800 mb-4"
          v-html="data.name"
        ></h3>
        <div
          class="prose prose-lg text-gray-600 max-w-none"
          v-html="data.content"
        ></div>
      </div>
    </template>
  </LazyDashboardLayoutContent>
</template>

<script setup lang="ts">
import { useGlobalVar } from "~/helpers/global-var";
import { useCRUD } from "~/modules/dashboard/services/campaigns/beneficiary";

const { show, remove } = useCRUD();
const campaign = show();
const { siteName } = useGlobalVar();
const router = useRouter();
const { $alertDeleteQuestion } = useNuxtApp();

const { locale, t } = useI18n();

siteName("global_dashboard.pages_title.campaigns-show");

const buttons: (data: any) => any[] = (data) => [
  {
    to: {
      name: "campaigns-edit",
      params: { id: data.id },
    },
    icon: "mdi-note-edit-outline",
    text: t("global_dashboard.pages_title.campaigns-edit"),
  },
  {
    text: t("global_dashboard.pages_title.campaigns-delete"),
    icon: "mdi-file-document-remove-outline",
    async action() {
      await $alertDeleteQuestion({
        imageUrl: data.image,
        title: [t("donor.remove"), data.name].join(" "),
        preConfirm: () =>
          remove(data.id).then(() => {
            router.push({ name: "home-dashboard" });
          }),
      });
    },
  },
];
</script>
