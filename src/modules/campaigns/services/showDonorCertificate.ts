import { api } from "~/helpers/axios";
import { useRoute } from "#imports";

export const useShowDonorCertificate = () => {
  const { locale } = useI18n();
  const route = useRoute();

  const id = route.params.id;

  if (!id) return {};

  const { data, status, error, refresh } = useAsyncData(
    `donor-certificate-${id}`,
    async () => {
      const response = await api.get(`/get/donor/certificate/${id}`);
      return response.data.result;
    },
    { watch: [locale] }
  );

  return {
    donorData: data,
    status,
    error,
    refresh,
  };
};
