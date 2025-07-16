<template>
 <div class="max-w-[1000px] mx-auto w-full print:hidden mb-6 px-4">
  <div class="flex justify-start">
    <button
      @click="handlePrint"
      class="px-8 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
    >
      🖨️ Print Certificate
    </button>
  </div>
</div>

    <div v-if="status === 'pending'" class="text-center">⏳ Loading certificate...</div>

    <div v-else-if="status === 'error'" class="text-center text-red-500">
      ❌ Error loading certificate: {{ error.message }}
    </div>

    <div
      v-else
      class="relative bg-white min-h-screen flex items-center justify-center w-full max-w-[1000px] mx-auto px-10 py-12 md:px-16 md:py-20 shadow-lg overflow-hidden print:w-[210mm] print:h-[297mm] print:shadow-none print:p-20"
    >
      <!-- background frame -->
      <img
        src="~/assets/images/certificate-frame.svg"
        alt="Certificate Frame"
        class="absolute inset-0 w-full h-full object-cover z-0 print:hidden"
      />

      <!-- Certificate Content -->
      <div class="relative z-10 flex flex-col md:flex-row justify-between gap-12 w-full">
        <!-- Left section: text -->
        <div class="flex-1">
          <h1 class="text-3xl md:text-5xl font-light text-[#12121299] leading-[70px]">CERTIFICATE</h1>
          <p class="text-lg md:text-xl text-[#12121299] mb-4 leading-[68px]">Of Donation</p>
          <h2 class="text-3xl md:text-5xl font-bold text-purple-600 mb-4">
            {{ donorData.name }}
          </h2>

          <p class="mt-8 text-[#12121299] md:text-lg">
            In recognition of your generous contribution of
            <span class="text-purple-600 font-semibold">
              {{ donorData.amount }}$
            </span>
          </p>
          <p class="mt-4 text-sm md:text-base text-[#12121299] leading-relaxed">
            Your kindness supports <strong>"orphans in need"</strong>, providing them with
          </p>
          <p class="mt-1 text-sm md:text-base text-[#12121299]">hope, care, and a brighter future.</p>

          <p class="mt-4 text-sm text-gray-600"><strong>Date:</strong> {{ donorData.date }}</p>
        </div>

        <!-- Right section: logo + signatures -->
        <div class="flex flex-col sm:flex-row-reverse md:flex-col items-center md:items-end justify-between gap-6 md:gap-8 w-full md:w-[220px]">
          <img
            src="~/assets/images/logo.png"
            class="w-28 md:w-32"
            alt="Orphans Logo"
          />

          <div class="flex flex-col gap-4 text-left md:text-right">
            <div class="mb-12">
              <p class="tracking-widest text-purple-600 text-sm md:text-base font-semibold">Ms. Carla Smith</p>
              <span class="text-purple-600">President Director</span>
            </div>
            <div>
              <p class="tracking-widest text-purple-600 text-sm md:text-base font-semibold">Mr. Alexander Rush</p>
              <span class="text-purple-600">General Manager</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  
</template>

<script setup>
import { useShowDonorCertificate } from '../services/showDonorCertificate'

const { donorData, status, error, refresh } = useShowDonorCertificate()

const handlePrint = async () => {
  await refresh()
  window.print()
}
</script>

<style scoped>
@media print {
  body {
    margin: 0;
  }
}
</style>

