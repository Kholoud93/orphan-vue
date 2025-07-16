<template>
  <div class="bg-gray-100 py-10 px-4 min-h-screen print:bg-white print:p-0">
    <!-- زر الطباعة -->
    <div class="max-w-5xl mx-auto w-full print:hidden mb-6 px-4">
      <div class="flex justify-start">
        <button
          class="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm sm:text-base"
          @click="handlePrint"
        >
          🖨️ Print Certificate
        </button>
      </div>
    </div>

    <!-- شهادة الإهداء -->
    <div
      v-if="status === 'success' && giftData"
      class="relative w-full max-w-5xl mx-auto shadow-lg overflow-hidden rounded-lg print:shadow-none print:border-none print:p-0 print:w-[210mm] print:h-[297mm]"
    >
      <!-- ✅ الفريم كـخلفية -->
      <img
        src="~/assets/images/gift-frame.svg"
        alt="Gift Frame"
        class="absolute inset-0 w-full h-full object-cover z-0 print:hidden pointer-events-none"
      />

      <!-- ✅ المحتوى فوق الفريم -->
      <div class="relative z-10 p-6 sm:p-10 md:p-16 text-gray-800 text-center">
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-700 mb-4">
          You’ve Received a Gift 🎁
        </h1>

        <p class="mt-4 text-sm sm:text-base leading-6 max-w-2xl mx-auto">
          <strong class="text-purple-700">{{ giftData.name }}</strong>, we’re delighted to let you know that a donation has been made in your honor by
          <strong class="text-purple-700">{{ giftData.donor_name || 'Someone Special' }}</strong>.
        </p>

        <p class="mt-4 text-sm sm:text-base leading-6 max-w-2xl mx-auto text-gray-700">
          This gift isn’t just a kind gesture — it’s a real donation that helps provide vital support to orphans and vulnerable children through the
          <a
            href="https://orphansociety.net/"
            target="_blank"
            class="underline text-blue-500 font-medium"
          >
            Orphan Community
          </a>.
        </p>

        <!-- ✅ التفاصيل -->
        <div class="mt-8 text-left text-sm sm:text-base text-gray-700 max-w-xl mx-auto leading-6">
          <h4 class="font-semibold text-lg mb-2">Donation Details:</h4>
          <p>💰 <strong>Amount:</strong> ${{ giftData.amount }}</p>
          <p>📅 <strong>Date:</strong> {{ giftData.date }}</p>
          <p>🤝 <strong>Donated by:</strong> {{ giftData.donor_name || 'Anonymous' }}</p>

          <div class="border my-4"></div>

          <p>
            💡 You can see the campaign: <br />
            <span class="italic text-gray-600">
              Technical Endowment for People with Disabilities — Zina Mohammed Abdul Hai Abu Nasser
            </span>
          </p>

          <p class="mt-4 text-purple-700 font-medium">
            Thank you for inspiring this meaningful act of kindness 🌱
          </p>
        </div>

        <!-- ✅ التوقيع والتاريخ -->
        <div class="flex flex-col sm:flex-row justify-between gap-8 mt-12 px-12 md:px-20 text-sm text-gray-700">
          <div class="text-center sm:text-left">
            <div class="border-t-2 border-gray-400 w-40 mx-auto sm:mx-0 mb-1"></div>
            <p class="tracking-widest">DATE</p>
            <p>{{ giftData.date }}</p>
          </div>
          <div class="text-center sm:text-right">
            <div class="border-t-2 border-gray-400 w-40 mx-auto sm:mx-0 mb-1"></div>
            <p class="tracking-widest">SIGNATURE</p>
            <p>Gift Certificate Team</p>
          </div>
        </div>
      </div>
    </div>

    <!-- حالات التحميل -->
    <div v-else-if="status === 'pending'" class="text-center text-gray-500 mt-20">
      ⏳ Loading certificate...
    </div>

    <!-- خطأ -->
    <div v-else class="text-center text-red-600 mt-20">
      ❌ Error loading certificate. Please check the link.
    </div>
  </div>
</template>

<script setup lang="ts">
import { useShowGiftCertificate } from '../services/showGiftCertificate'

const { giftData, status } = useShowGiftCertificate()

const handlePrint = () => {
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









