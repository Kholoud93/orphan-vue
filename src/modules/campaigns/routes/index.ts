import { resolve } from "pathe";

const campaignsRoutes = [
  {
    name: "campaigns",
    path: "/campaigns",
    file: resolve(__dirname, "../pages/AllCampaigns.vue"),
  },

    {
    name: "campaigns-for-familty",
    path: "/family/campaigns",
    file: resolve(__dirname, "../pages/AllFamilyCampaigns.vue"),
  },

  // {
  //   name: "gift",
  //   path: "/gift/:id",
  //   file: resolve(__dirname, "../pages/ShowGift.vue"),
  // },

{ 
  name: "donation/thank-you",
  path: "/donation/thank/you/:id",
  file: resolve(__dirname, "../pages/showDonation.vue"),

},
 {
  name: "gift-certificate",
  path: "/gift/:id",
  file: resolve(__dirname, "../pages/ShowGift.vue"),
},

{
  name: "donation",
  path: "/donation/:id",
  redirect: (to: any) => `/donation/thank/you/${to.params.id}`,
},

  {
    name: "campaign",
    path: "/campaigns/donate/:id",
    file: resolve(__dirname, "../pages/SingleCampaignDonate.vue"),
  },
  {
    name: "affiliate-charity",
    path: "/charity/:id",
    file: resolve(__dirname, "../pages/AllCharityCampaigns.vue"),
  },
  {
    name: "view-campaign",
    path: "/campaigns/:id",
    file: resolve(__dirname, "../pages/ViewCampaign.vue"),
  },
  {
    name: "payment-return",
    path: "/payment/return",
    file: resolve(__dirname, "../pages/PaymentReturn.vue"),
  },
];

export default campaignsRoutes;
