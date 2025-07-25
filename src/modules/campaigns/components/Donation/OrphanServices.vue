<script setup>
import { ErrorMessage, Field } from "vee-validate";
import { storeToRefs } from "pinia";
import { useCurrencyStore } from "../../store/currancy";

const currencyStore = useCurrencyStore();

const { selectedCurrencyLabel } = storeToRefs(currencyStore);
const props = defineProps(["donationData", "charity_amount"]);
const servicesType = defineModel();

// AI method
function interpolateColor(color1, color2, factor) {
  const c1 = parseInt(color1.slice(1), 16);
  const c2 = parseInt(color2.slice(1), 16);

  const r1 = (c1 >> 16) & 0xff;
  const g1 = (c1 >> 8) & 0xff;
  const b1 = c1 & 0xff;

  const r2 = (c2 >> 16) & 0xff;
  const g2 = (c2 >> 8) & 0xff;
  const b2 = c2 & 0xff;

  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

const stops = ["#8a2be2", "#00ff00", "#ffa500", "#ff0000"];
function getGradientColor(percent) {
  const segment = Math.floor(percent * 3);
  const localFactor = percent * 3 - segment;

  return interpolateColor(stops[segment], stops[segment + 1], localFactor);
}

const gradientColor = computed(() =>
  getGradientColor(props.donationData.orphan_services / 100)
);
</script>

<template>
  <div class="donation_orphan_services mt-6">
    <h5 class="font-semibold text-md mb-3">
      {{ $t("campaigns.orphan_services") }}
    </h5>
    <!-- <p class="text-sm my-4 text-gray-400">
      {{ $t("campaigns.orphan_services_dec") }}
    </p> -->

    <!--
     <GlobalRadioInputs
      class="inline-flex"
      v-model="servicesType"
      name="servicesType"
      :data="[
        { title: $t('global.relative_value'), value: 'relative' },
        { title: $t('global.absolute_value'), value: 'absolute' },
      ]"
    /> -->

    <div class="relative" v-if="servicesType == 'relative'">
      <div style="direction: ltr">
        <div class="w-[97%] mx-auto relative pt-6">
          <div
            class="i one-line"
            :style="`left: ${donationData.orphan_services}%`"
          >
            <!-- {{ donationData.orphan_services }}% = -->
            {{ charity_amount }}
            {{ selectedCurrencyLabel }}
          </div>
        </div>
        <div class="slider my-2 flex relative">
          <!-- <div
            class="grid absolute top-1/2 left-0 -translate-y-1/2 w-full"
            :class="`grid-cols-${stops.length}`"
          >
            <div
              v-for="color in stops"
              :key="color"
              class="col h-1"
              :style="`background: ${color};`"
            ></div>
          </div> -->

          <div
            class="simple-gradient h-1 absolute bottom-1/2 left-0 translate-y-1/2 w-full"
          ></div>
          <input
            type="range"
            class="level relative"
            step="5"
            min="0"
            max="100"
            v-model="donationData.orphan_services"
          />
        </div>
      </div>
      <!-- -->
      <!-- <div class="flex justify-between text-gray-400 text-sm py-2">
        <span v-for="i in 5" :key="i">{{ ((i - 1) / 4) * 100 }}%</span>
      </div> -->
      <div
        @click="servicesType = 'absolute'"
        class="text-sm cursor-pointer my-2 underline hover:no-underline"
      >
        {{ $t("global.absolute_value") }}
      </div>
    </div>
    <div v-else>
      <InputsText
        class="my-3"
        name="ca"
        rules="required|englishNumbersOnly|integer"
        inputmode="numeric"
        v-model="donationData.charity_amount"
        :placeholder="$t('global.custom_amount')"
      >
        <template #icon>
          <svg
            width="19"
            height="21"
            viewBox="0 0 19 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.3253 1.7502H6.67527C6.52829 2.47087 6.17263 3.13241 5.65255 3.65249C5.13247 4.17257 4.47094 4.52822 3.75027 4.6752V5.3252C4.47094 5.47218 5.13247 5.82783 5.65255 6.34791C6.17263 6.86799 6.52829 7.52953 6.67527 8.2502H11.3253C11.4722 7.52953 11.8279 6.86799 12.348 6.34791C12.8681 5.82783 13.5296 5.47218 14.2503 5.3252V4.6752C13.5296 4.52822 12.8681 4.17257 12.348 3.65249C11.8279 3.13241 11.4722 2.47087 11.3253 1.7502ZM11.9303 0.2532C11.6556 0.250533 11.3629 0.249533 11.0523 0.2502H6.94827C6.6376 0.2502 6.34527 0.2512 6.07127 0.2532C6.01661 0.249707 5.96176 0.250711 5.90727 0.2562C5.45527 0.2642 5.05427 0.2832 4.70627 0.3302C4.07827 0.4142 3.51127 0.6002 3.05627 1.0552C2.60027 1.5112 2.41427 2.0782 2.33027 2.7052C2.28327 3.0542 2.26427 3.4552 2.25627 3.9072C2.25083 3.96136 2.24983 4.01588 2.25327 4.0702C2.2506 4.34553 2.2496 4.6382 2.25027 4.9482V5.0522C2.25027 5.3622 2.25127 5.65487 2.25327 5.9302C2.24983 5.98452 2.25083 6.03904 2.25627 6.0932C2.26427 6.5462 2.28327 6.9462 2.33027 7.2942C2.41427 7.9222 2.60027 8.4892 3.05627 8.9442C3.51127 9.4002 4.07827 9.5862 4.70627 9.6702C5.05427 9.7172 5.45527 9.7362 5.90727 9.7442C5.96176 9.74969 6.01661 9.75069 6.07127 9.7472C6.34527 9.74987 6.6376 9.75087 6.94827 9.7502H11.0523C11.3623 9.7502 11.6549 9.7492 11.9303 9.7472C11.9846 9.75064 12.0391 9.74964 12.0933 9.7442C12.5463 9.7362 12.9473 9.7172 13.2943 9.6702C13.9223 9.5862 14.4893 9.4002 14.9443 8.9442C15.4003 8.4892 15.5863 7.9222 15.6703 7.2942C15.7168 6.89552 15.7415 6.49458 15.7443 6.0932C15.7497 6.03904 15.7507 5.98452 15.7473 5.9302C15.7499 5.65487 15.7509 5.3622 15.7503 5.0522V4.9482C15.7503 4.6382 15.7493 4.34553 15.7473 4.0702C15.7507 4.01588 15.7497 3.96136 15.7443 3.9072C15.7415 3.50582 15.7168 3.10488 15.6703 2.7062C15.5863 2.0782 15.4003 1.5112 14.9453 1.0562C14.4893 0.6002 13.9223 0.4142 13.2953 0.3302C12.8963 0.283603 12.495 0.258899 12.0933 0.2562C12.0391 0.250765 11.9846 0.249762 11.9303 0.2532ZM12.8943 1.7942C13.0077 2.09328 13.1832 2.36488 13.4094 2.59105C13.6356 2.81722 13.9072 2.99281 14.2063 3.1062C14.1999 3.03939 14.1923 2.97271 14.1833 2.9062C14.1223 2.4442 14.0143 2.2462 13.8833 2.1162C13.7523 1.9862 13.5563 1.8792 13.0953 1.8162C13.0288 1.80753 12.9621 1.80019 12.8953 1.7942M14.2073 6.8942C13.9082 7.00759 13.6366 7.18318 13.4104 7.40935C13.1842 7.63552 13.0087 7.90712 12.8953 8.2062C12.9653 8.19953 13.0319 8.1922 13.0953 8.1842C13.5573 8.1212 13.7553 8.0142 13.8853 7.8842C14.0153 7.7542 14.1233 7.5562 14.1853 7.0942C14.1933 7.03087 14.2006 6.9642 14.2073 6.8942ZM5.10727 8.2062C4.99387 7.90712 4.81829 7.63552 4.59212 7.40935C4.36595 7.18318 4.09434 7.00759 3.79527 6.8942C3.80193 6.9642 3.8096 7.03087 3.81827 7.0942C3.88027 7.5562 3.98727 7.7542 4.11827 7.8842C4.24927 8.0142 4.44527 8.1212 4.90627 8.1842C4.97027 8.1922 5.03727 8.19953 5.10727 8.2062ZM3.79527 3.1062C4.09434 2.99281 4.36595 2.81722 4.59212 2.59105C4.81829 2.36488 4.99387 2.09328 5.10727 1.7942C5.03727 1.80087 4.9706 1.80853 4.90727 1.8172C4.44527 1.8792 4.24727 1.9862 4.11727 2.1172C3.98727 2.2482 3.88027 2.4442 3.81727 2.9052L3.79527 3.1062ZM9.00027 4.7502C8.93396 4.7502 8.87037 4.77654 8.82349 4.82342C8.77661 4.87031 8.75027 4.9339 8.75027 5.0002C8.75027 5.0665 8.77661 5.13009 8.82349 5.17698C8.87037 5.22386 8.93396 5.2502 9.00027 5.2502C9.06657 5.2502 9.13016 5.22386 9.17704 5.17698C9.22393 5.13009 9.25027 5.0665 9.25027 5.0002C9.25027 4.9339 9.22393 4.87031 9.17704 4.82342C9.13016 4.77654 9.06657 4.7502 9.00027 4.7502ZM7.25027 5.0002C7.25027 4.53607 7.43464 4.09095 7.76283 3.76276C8.09102 3.43457 8.53614 3.2502 9.00027 3.2502C9.4644 3.2502 9.90952 3.43457 10.2377 3.76276C10.5659 4.09095 10.7503 4.53607 10.7503 5.0002C10.7503 5.46433 10.5659 5.90945 10.2377 6.23764C9.90952 6.56583 9.4644 6.7502 9.00027 6.7502C8.53614 6.7502 8.09102 6.56583 7.76283 6.23764C7.43464 5.90945 7.25027 5.46433 7.25027 5.0002ZM5.68427 12.4482C7.55027 12.0872 9.54727 12.1682 11.1643 13.1322C11.3903 13.2672 11.6043 13.4362 11.7893 13.6442C12.1653 14.0672 12.3593 14.5912 12.3683 15.1172C12.5589 14.9932 12.7513 14.8575 12.9453 14.7102L14.7533 13.3452C15.2062 13.0128 15.7534 12.8335 16.3153 12.8335C16.8771 12.8335 17.4243 13.0128 17.8773 13.3452C18.7123 13.9752 19.0463 15.1082 18.4473 16.0682C18.0223 16.7492 17.3823 17.6922 16.7303 18.2962C16.0703 18.9062 15.1333 19.4202 14.4243 19.7622C13.5623 20.1782 12.6323 20.4082 11.7273 20.5542C9.87727 20.8542 7.95327 20.8082 6.12527 20.4312C5.18256 20.2374 4.22269 20.1392 3.26027 20.1382H1.00027C0.801354 20.1382 0.610589 20.0592 0.469937 19.9185C0.329284 19.7779 0.250267 19.5871 0.250267 19.3882C0.250267 19.1893 0.329284 18.9985 0.469937 18.8579C0.610589 18.7172 0.801354 18.6382 1.00027 18.6382H3.26027C4.32227 18.6382 5.39527 18.7492 6.42827 18.9622C8.09443 19.3041 9.80871 19.3417 11.4883 19.0732C12.3163 18.9392 13.0903 18.7402 13.7723 18.4112C14.4553 18.0812 15.2233 17.6472 15.7103 17.1962C16.2033 16.7392 16.7543 15.9482 17.1753 15.2742C17.3023 15.0702 17.2843 14.7772 16.9733 14.5422C16.6033 14.2622 16.0263 14.2622 15.6573 14.5422L13.8503 15.9072C13.1283 16.4522 12.2403 17.0352 11.1393 17.2112C11.0239 17.2295 10.9082 17.2455 10.7923 17.2592C10.7349 17.2692 10.6753 17.2759 10.6133 17.2792C9.97078 17.3416 9.32376 17.3416 8.68127 17.2792C8.58166 17.272 8.4845 17.2449 8.39548 17.1997C8.30647 17.1544 8.22739 17.0918 8.16289 17.0156C8.09839 16.9393 8.04976 16.8509 8.01987 16.7557C7.98998 16.6604 7.97942 16.5601 7.98881 16.4606C7.9982 16.3612 8.02735 16.2647 8.07455 16.1767C8.12176 16.0887 8.18606 16.011 8.2637 15.9481C8.34133 15.8853 8.43073 15.8386 8.52665 15.8108C8.62256 15.783 8.72307 15.7746 8.82227 15.7862C9.37702 15.8399 9.93571 15.8389 10.4903 15.7832L10.5203 15.7802C10.6136 15.7223 10.6929 15.6444 10.7524 15.5522C10.812 15.4599 10.8503 15.3556 10.8646 15.2467C10.879 15.1378 10.869 15.0271 10.8354 14.9226C10.8018 14.8181 10.7454 14.7223 10.6703 14.6422C10.5901 14.555 10.4974 14.4802 10.3953 14.4202C9.21427 13.7152 7.63627 13.5982 5.96927 13.9202C4.34082 14.2471 2.7971 14.9058 1.43427 15.8552C1.3539 15.9122 1.26309 15.9528 1.16703 15.9747C1.07097 15.9966 0.971532 15.9994 0.874402 15.9828C0.777272 15.9663 0.684348 15.9308 0.600937 15.8784C0.517526 15.8259 0.44526 15.7576 0.388267 15.6772C0.331273 15.5968 0.290667 15.506 0.268768 15.41C0.246868 15.3139 0.244104 15.2145 0.260633 15.1173C0.294014 14.9212 0.403954 14.7463 0.566267 14.6312C2.10359 13.5586 3.84605 12.8154 5.68427 12.4482Z"
              fill="#8957E9"
            />
          </svg>
        </template>
      </InputsText>
      <div
        @click="servicesType = 'relative'"
        class="text-sm cursor-pointer my-3 underline hover:no-underline"
      >
        {{ $t("global.relative_value") }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.slider {
  /* slider */
  --slider-width: 100%;
  --slider-height: 25px;
  --slider-bg: #eeeeee;
  --slider-border-radius: 5px;
  /* level */
  /* --level-color: v-bind(gradientColor); */
  --level-color: #eeeeee;
  --level-transition-duration: 5s;

  /* icon */
  --icon-margin: 25px;
  --icon-color: var(--slider-bg);
  --icon-size: 30px;

  position: relative;
  cursor: pointer;
  direction: ltr;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: reverse;
  -ms-flex-direction: row-reverse;
  flex-direction: row-reverse;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.slider .level {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: var(--slider-width);
  height: var(--slider-height);
  background: var(--slider-bg);
  background: linear-gradient(
    transparent 30%,
    var(--slider-bg) 30%,
    var(--slider-bg) 70%,
    transparent 70%,
    transparent
  );
  background: transparent;

  overflow: hidden;
  /* // border-radius: var(--slider-border-radius); */
  -webkit-transition: height var(--level-transition-duration);
  -o-transition: height var(--level-transition-duration);
  transition: height var(--level-transition-duration);
  cursor: inherit;
}

.slider .level::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: var(--slider-height);
  height: var(--slider-height);
  background: var(--level-color);
  border-radius: 50%;

  /* 
  // -webkit-box-shadow: -100vw 0px 0px calc(100vw - 10px) var(--level-color);
  // box-shadow: -100vw 0px 0px calc(100vw - 10px) var(--level-color); 
  */
}

.slider .level::-moz-range-thumb {
  width: var(--slider-height);
  height: var(--slider-height);
  background: var(--level-color);
  border-radius: 50%;
  border: none;
  /* // box-shadow: -100vw 0px 0px calc(100vw - 10px) var(--level-color); */
}

.i {
  position: absolute;
  padding: 0.2em 0.5em;
  top: 0;
  filter: drop-shadow(0px 1px 1px rgb(197, 197, 197));
  transform: translate(-50%, -0.5rem);
  user-select: none;
  @apply rounded-md bg-gray-100 text-neutral-800;
  overflow: visible !important;
}
.i::after {
  display: block;
  @apply rounded-sm bg-gray-100;
  position: absolute;
  left: 50%;
  bottom: 0;
  /* content: ""; */
  width: 10px;
  height: 10px;
  transform: translate(-50%, 50%) rotate(45deg);
}

.simple-gradient {
  border-radius: 5px;
  background-image: linear-gradient(90deg, #00ff00, #8a2be2, #ffa500, #ff0000);
}
</style>
