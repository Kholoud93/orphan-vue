<template>
  <section aria-label="overview section">
    <GlobalContainer
      class="gap-sm pt-sm pb-sm flex justify-between lg:flex-row md:flex-col-reverse xl:flex-row flex-col-reverse items-center"
    >
      <div class="card w-[366px]">
        <v-card class="rounded-lg elevation-0" v-if="status == 'pending'">
          <v-skeleton-loader class=" " type="image, article" />
        </v-card>

        <Card
          v-if="status == 'success'"
          :id="campaignData?.id"
          :rate="
            (campaignData?.total_amount / campaignData?.price_target) * 100
          "
          :shadow="false"
          :donateBtn="false"
          :status="campaignData?.status"
          :route="`/campaigns`"
          :in_cart="campaignData?.in_cart || false"
          :cart_status="campaignData?.cart_status || ''"
          :cart_id="campaignData?.cart_id || ''"
        >
          <template #image>
            <img
              loading="lazy"
              @click="$router.push(`/campaigns/${campaignData.id}`)"
              :src="campaignData?.image || '/img/R.jpg'"
              class="w-full max-h-[15rem] object-cover rounded-lg"
              alt=" op"
            />
          </template>

          <template #company>
            <img
              :src="campaignData?.logo"
              :alt="campaignData?.name"
              loading="lazy"
            />
            <span>
              {{ campaignData?.user?.name }}
            </span>
          </template>

          <template #title>{{ campaignData?.name }}</template>

          <template #desc>
            <span
              v-html="stripHtmlTags(campaignData?.short_desc)?.slice(0, 30)"
            ></span
          ></template>

          <template #subscribers>{{ campaignData?.total_donors }}</template>

          <template #total_donation>${{ campaignData?.price_target }}</template>

          <template #donation>${{ campaignData?.total_amount }}</template>
        </Card>
      </div>
    </GlobalContainer>
  </section>
</template>

<script setup>
// import { stripHtmlTags } from "~/helpers/string";
import Card from "~/global/Card.vue";
// import { useViewCampaign } from "../services/single-campaign";
// const route = useRoute();

import { stripHtmlTags } from "~/helpers/string";

const props = defineProps({
  campaignData: {
    required: true,
  },
  status: {
    required: true,
  },
});
</script>
