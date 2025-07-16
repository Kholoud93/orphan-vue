<template>
  <Form @submit="onSubmit" class="space-y-6" v-slot="{ values, setFieldValue, errors }">
    <div class="grid gap-6">
      <!-- Title Tabs -->
      <div>
        <h3 class="font-bold opacity-60 mb-2 text-sm">
          {{ $t("global_dashboard.video_form.title") }}
        </h3>
        <v-tabs v-model="currentLangTab" grow>
          <v-tab value="en">EN</v-tab>
          <v-tab value="ar">AR</v-tab>
          <v-tab value="ms">MS</v-tab>
        </v-tabs>

        <v-window v-model="currentLangTab">
          <v-window-item value="en">
            <InputsText name="en[title]" v-model="data.en.title"
              :placeholder="$t('global_dashboard.video_form.title_en')" rules="required" icon="mdi-translate"
              class="mt-4" />
          </v-window-item>
          <v-window-item value="ar">
            <InputsText name="ar[title]" v-model="data.ar.title"
              :placeholder="$t('global_dashboard.video_form.title_ar')" rules="required" icon="mdi-translate"
              class="mt-4" />
          </v-window-item>
          <v-window-item value="ms">
            <InputsText name="ms[title]" v-model="data.ms.title"
              :placeholder="$t('global_dashboard.video_form.title_ms')" icon="mdi-translate" class="mt-4" />
          </v-window-item>
        </v-window>
      </div>

      <!-- Video URL + Status -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="font-bold opacity-60 mb-2 text-sm">
            {{ $t("global_dashboard.video_form.video_url") }}
          </h3>
          <InputsText name="video_url" inputmode="url" v-model="data.video_url" type="url" rules="required|url"
            placeholder="https://example.com/video" />
        </div>

        <div>
          <h3 class="font-bold opacity-60 mb-2 text-sm">
            {{ $t("global_dashboard.video_form.status") }}
          </h3>
          <InputsSelect name="status" v-model="data.status" :items="[
            { title: $t('global_dashboard.video_form.show'), value: 'show' },
            { title: $t('global_dashboard.video_form.hide'), value: 'hide' },
          ]" rules="required" />
        </div>
      </div>

      <!-- Is Main + Image -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="font-bold opacity-60 mb-2 text-sm">
            {{ $t("global_dashboard.video_form.is_main") }}
          </h3>
          <InputsCheckbox name="is_main" :title="$t('global_dashboard.video_form.is_main')" :checked="data.is_main == 'yes'"
            @change="data.is_main = $event.target.checked ? 'yes' : 'no'" />

        </div>

        <div>
          <h3 class="font-bold opacity-60 mb-2 text-sm">
            {{ $t("global_dashboard.video_form.image") }}
          </h3>
          <InputsFile name="thumbnail" accept="image/*" :title="$t('global_dashboard.video_form.image')"
            v-model="data.thumbnail" />
        </div>
      </div>
    </div>

    <!-- Submit -->
    <InputsSubmit :isLoading="isLoading" />
  </Form>
</template>

<script setup>
import { Form } from "vee-validate";
import { ref, reactive } from "vue";

const props = defineProps({
  isLoading: { type: Boolean, default: false },
  defaultValues: { type: Object, default: () => ({}) },
});

const currentLangTab = ref("en");

const data = reactive({
  en: { title: "" },
  ar: { title: "" },
  ms: { title: "" },
  video_url: "",
  is_main: "no",
  status: "show",
  thumbnail: null,
  ...props.defaultValues,
});

const emit = defineEmits(["submit"]);

const onSubmit = (a, b) => {
  emit("submit", data, b);
};
</script>
