import Swal from "sweetalert2";
import { api } from "~/helpers/axios";

export const useAllCampaigns = () => {
  const { locale, t } = useI18n();
  const loading = ref(false);

  const { data, error, refresh, status } = useAsyncData(
    "all-campaigns",
    () => api.get("/all-campaigns").then((response) => response.data.result),
    { watch: [locale] }
  );

  const submitAllCampaigns = async (payload: any) => {
    try {
      loading.value = true;

      const res = await api.post("/visitor/cart", payload);

      const { url } = res.data.result;

      if (url) {
        window.location.href = url;
      }
    } catch (err: any) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: err.response?.data?.message || err.message,
        confirmButtonText: t("campaigns.ok"),
        html: `<ul>${Object.values(err.response.data.errors)
          .flat()
          .map((i) => `<li>${i}</li>`)
          .join(" ")}</ul>`,
      });
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    data,
    refresh,
    status,
    submitAllCampaigns,
  };
};
