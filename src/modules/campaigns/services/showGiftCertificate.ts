import { certificateApi } from '~/helpers/certificates-api'
import { useRoute } from 'vue-router'

export const useShowGiftCertificate = () => {
  const route = useRoute()
  const id = route.params.id

  const {
    data: giftData,
    status,
    error,
  } = useAsyncData(`gift-certificate-${id}`, async () => {
    const response = await certificateApi.get(`/get/addressee/certificate/${id}`)
    return response.data.result
  })

  return {
    giftData,
    status,
    error,
  }
}


