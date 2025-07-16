import { useAuth } from "~/modules/auth/services/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useAuth();

  if (!user.value || user.value.user_type !== "beneficiary") {
    return navigateTo("/dashboard/home");
  }
});
