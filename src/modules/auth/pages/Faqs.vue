<template>
  <BreadCrumb>
    <template #first_page> {{ $t("global.home") }} </template>
    <template #second_page> {{ $t("global.home") }} </template>
    <template #third_page> {{ $t("auth.fq_title") }} </template>
  </BreadCrumb>

  <GlobalContainer class="faqs">
    <div class="title_desc">
      <h1 class="text-black font-bold lg:text-4xl md:text-4xl text-3xl">
        {{ $t("auth.fq_title") }}
      </h1>

      <p class="text-sm">{{ $t("auth.fq_desc") }}</p>
    </div>

    <div class="questions w-full">
      <div class="mt-6" v-if="status == 'pending'">
        <v-skeleton-loader
          v-for="(item, index) in 6"
          :key="index"
          type="avatar, list-item-two-line"
        ></v-skeleton-loader>
      </div>

      <v-expansion-panels
        v-if="status == 'success'"
        class="mb-6 mt-6"
        elevation="0"
      >
        <v-expansion-panel v-for="(item, index) in faqs" :key="index">
          <v-expansion-panel-title expand-icon="mdi-menu-down">
            <div class="flex items-center gap-x-3">
              <img
                loading="lazy"
                v-if="index % 2 == 0"
                src="~/assets/images/dashboard/amount.svg"
                alt="orphanssociety image"
              />

              <img
                loading="lazy"
                v-else
                src="~/assets/images/dashboard/campaigns.svg"
                alt="orphanssociety image"
              />

              <h2 class="text-[#121212] text-xl font-bold">
                {{ item.title }}
              </h2>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            {{ getTextFromHTML(item.content) }}
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </GlobalContainer>
</template>

<script setup lang="ts">
import BreadCrumb from "~/global/BreadCrumb.vue";
import { useGlobalVar } from "~/helpers/global-var";
import { useFaqs } from "../services/faqs";

const { faqs, status } = useFaqs();

const getTextFromHTML = (htmlString: string) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;

  const text = Array.from(tempDiv.childNodes)
    .map((node: any) => node.textContent.trim())
    .filter((text) => text !== "")
    .join(" ");

  return text;
};
const { siteName } = useGlobalVar();
siteName("auth.page_title_faq");
</script>
