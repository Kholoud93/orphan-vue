 <li v-if="'beneficiary' == user.user_type">
        <nuxt-link
          :to="{ name: 'orphans' }"
          class="flex items-center gap-x-2 p-2 max-lg:justify-center"
        >
          <v-icon icon="mdi-account-child-outline" size="small" />
          <span>{{ $t("global_dashboard.pages_title.orphans") }}</span>
        </nuxt-link>
      </li>
      <li v-if="'beneficiary' != user.user_type">
        <nuxt-link
          :to="{ name: 'more_campaigns' }"
          class="flex items-center gap-x-2 p-2 max-lg:justify-center"
        >
          <v-icon icon="mdi-view-grid-plus" size="small" />
          <span>{{ $t("campaigns.all_campaigns") }}</span>
        </nuxt-link>
      </li>
