<template>
  <div class="notif-settings pt-sm">
    <h2 class="text-xl font-bold">
      {{ $t("donor.notif_title") }}
    </h2>
    <p class="text-sm text-[#4a4a4a]">
      {{ $t("donor.notif_desc") }}
    </p>

    <div class="options mt-4">
      <!-- option -->
      <div class="flex justify-between items-center">
        <div>
          <div class="flex items-center gap-x-3">
            <img
              loading="lazy"
              src="~/assets/images/dashboard/campaigns.svg"
              alt="orphanssociety image"
            />
            <span class="text-xl">{{ $t("donor.op1_title") }}</span>
          </div>

          <p class="text-sm text-[#4a4a4a] pt-2">
            {{ $t("donor.op1_desc") }}
          </p>
        </div>

        <v-switch v-model="model1" color="#9333ea" hide-details></v-switch>
      </div>

      <div class="flex justify-between items-center mt-4">
        <div>
          <div class="flex items-center gap-x-3">
            <img
              loading="lazy"
              src="~/assets/images/dashboard/donation.svg"
              alt="orphanssociety image"
            />
            <span class="text-xl">{{ $t("donor.op2_title") }}</span>
          </div>

          <p class="text-sm text-[#4a4a4a] pt-2">
            {{ $t("donor.op2_desc") }}
          </p>
        </div>

        <v-switch v-model="model2" color="#9333ea" hide-details></v-switch>
      </div>

      <div class="flex justify-between items-center mt-4">
        <div>
          <div class="flex items-center gap-x-3">
            <img
              loading="lazy"
              src="~/assets/images/dashboard/notification.svg"
              alt="orphanssociety image"
            />
            <span class="text-xl">{{ $t("donor.op3_title") }}</span>
          </div>

          <p class="text-sm text-[#4a4a4a] pt-2">
            {{ $t("donor.op3_desc") }}
          </p>
        </div>

        <v-switch v-model="model3" color="#9333ea" hide-details></v-switch>
      </div>

      <div class="flex justify-between items-center mt-4">
        <div>
          <div class="flex items-center gap-x-3">
            <img
              loading="lazy"
              src="~/assets/images/dashboard/warning.svg"
              alt="orphanssociety image"
            />
            <span class="text-xl">{{ $t("donor.op4_title") }}</span>
          </div>

          <p class="text-sm text-[#4a4a4a] pt-2">
            {{ $t("donor.op4_desc") }}
          </p>
        </div>

        <v-switch v-model="model4" color="#9333ea" hide-details></v-switch>
      </div>
    </div>

    <div class="notif-chanels mt-sm">
      <h2 class="text-xl font-semibold">
        {{ $t("donor.notif_chanels") }}
      </h2>

      <v-checkbox
        class="checkbox"
        v-model="Email"
        color="#9333ea"
        :label="$t('donor.email')"
      ></v-checkbox>

      <v-checkbox
        class="checkbox"
        v-model="SMS"
        color="#9333ea"
        :label="$t('donor.sms')"
      ></v-checkbox>

      <v-checkbox
        class="checkbox"
        v-model="push_notif"
        color="#9333ea"
        :label="$t('donor.push_notif')"
      ></v-checkbox>
    </div>
  </div>
</template>
<script setup>
const model1 = ref(true);
const model2 = ref(true);
const model3 = ref(true);
const model4 = ref(true);
const Email = ref(true);
const SMS = ref(true);
const push_notif = ref(true);
const show1 = ref(false);
const show2 = ref(false);
const show3 = ref(false);
</script>
