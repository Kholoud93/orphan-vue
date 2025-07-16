<template>
  <LazyDashboardLayoutContent :fetch="video">
    <!-- Page Header -->
    <template #header="data">
      <DashboardPageTitle
        :title="data.title"
        :subTitle="$t('global_dashboard.pages_title.videos-show')"
        :buttons="buttons(data)"
      />
    </template>

    <!-- Main Content -->
    <template v-slot="data">
      <div class="rounded-3xl overflow-hidden bg-gradient-to-bb from-neutral-50 to-gray-300 shadow">
        <div class="py-6 grid place-content-center bg-white">
          <img src="~/assets/images/logo.png" alt="videos" class="h-24 object-contain" />
        </div>

        <div class="p-6 flex flex-col gap-6 bg-gray-50 shadow">
          <section class="flex flex-col md:flex-row items-center gap-6 bg-white rounded-2xl p-6">
            <div class="relative">
              <img
                class="w-24 h-24 rounded-full object-cover shadow ring-2 ring-indigo-100"
                :src="data.image"
                :alt="data.title"
              />
            </div>

            <div class="text-center md:text-start">
              <h1 class="text-2xl font-bold text-gray-800">{{ data.title }}</h1>
              <p class="text-gray-500 text-sm mt-1">
                {{ $t("global_dashboard.video_form.status") }}:
                <span :class="data.status === 'show' ? 'text-green-500' : 'text-red-500'">
                  {{ $t(`global_dashboard.video_form.${data.status}`) }}
                </span>
              </p>
              <p class="text-sm mt-1">
                {{ $t("global_dashboard.video_form.is_main") }}:
                {{ data.is_main === 'yes' ? $t('global_dashboard.video_form.yes') : $t('global_dashboard.video_form.no') }}
              </p>
            </div>
          </section>

          <section class="bg-white rounded-2xl p-5">
            <h4 class="text-sm font-semibold text-gray-400 mb-3">
              {{ $t("global_dashboard.video_form.video_url") }}
            </h4>

            <LazyYoutube v-if="data.video_url" :src="data.video_url" />

            <div
              v-else
              class="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-xl py-10 px-6 text-center"
            >
              <div class="bg-gray-100 text-indigo-400 p-4 rounded-full">
                <v-icon icon="mdi-video-off" class="w-8 h-8" />
              </div>
              <h3 class="text-base font-semibold text-gray-600 mt-4">
                {{ $t("global_dashboard.video_form.no_video_available") }}
              </h3>
            </div>
          </section>
        </div>
      </div>
    </template>
  </LazyDashboardLayoutContent>
</template>

<script setup lang="ts">
import { useCRUD } from "~/modules/dashboard/services/videos"; // 👈 Update path
import { useGlobalVar } from "~/helpers/global-var";
const { show, remove } = useCRUD();

const video = show();
const router = useRouter();
const { locale, t } = useI18n();
const { $alertDeleteQuestion }: any = useNuxtApp();
const { siteName } = useGlobalVar();

siteName("global_dashboard.pages_title.videos-show");

const buttons = (data: any) => [
  {
    to: {
      name: "videos-edit",
      params: { id: data.id },
    },
    icon: "mdi-note-edit-outline",
    text: t("global_dashboard.pages_title.videos-edit"),
  },
  {
    text: t("global_dashboard.pages_title.videos-delete"),
    icon: "mdi-file-document-remove-outline",
    async action() {
      await $alertDeleteQuestion({
        imageUrl: data.image,
        title: [t("donor.remove"), data.title].join(" "),
        preConfirm: () =>
          remove(data.id).then(() => {
            router.push({ name: "videos" });
          }),
      });
    },
  },
];
</script>
