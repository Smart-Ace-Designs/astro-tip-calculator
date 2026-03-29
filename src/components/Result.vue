<script setup lang="ts">
import { computed } from "vue";
import { bill, party, customTip, standardTip, tip } from "@/stores/store";
import { useComputedStore } from "@/composables/useComputedStore";

const billValue = useComputedStore(bill);
const partyValue = useComputedStore(party);
const tipValue = useComputedStore(tip);
const customTipValue = useComputedStore(customTip);
const standardTipValue = useComputedStore(standardTip);

const tipPerPerson = computed(() => {
  if (+partyValue.value > 0 && +billValue.value > 0 && tipValue.value !== "") {
    return ((+billValue.value * (+tipValue.value / 100)) / +partyValue.value).toFixed(2);
  }
  return "0.00";
});

const totalPerPerson = computed(() => {
  if (+partyValue.value > 0 && +billValue.value > 0 && tipValue.value !== "") {
    return (+billValue.value / +partyValue.value + +tipPerPerson.value).toFixed(2);
  }
  return "0.00";
});

const billCompleted = computed(() => {
  return billValue.value && partyValue.value && tipValue.value;
});

const resetBill = () => {
  billValue.value = "";
  tipValue.value = "";
  partyValue.value = "";
  standardTipValue.value = "";
  customTipValue.value = "";
};
</script>

<template>
  <div
    class="mx-6 flex flex-col space-y-4 rounded-2xl bg-theme-very-dark-cyan px-6 pt-8 pb-6 lg:m-8 lg:space-y-12 lg:px-10 lg:pt-14 lg:pb-10"
  >
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-theme-light-grayish-cyan">Tip Amount</h2>
        <p class="text-sm text-theme-grayish-cyan">/ person</p>
      </div>
      <p class="text-[2rem] text-theme-strong-cyan lg:text-5xl">${{ tipPerPerson }}</p>
    </div>
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-theme-light-grayish-cyan">Total</h2>
        <p class="text-sm text-theme-grayish-cyan">/ person</p>
      </div>
      <p class="text-[2rem] text-theme-strong-cyan lg:text-5xl">${{ totalPerPerson }}</p>
    </div>
    <div class="lg:mt-auto"></div>
    <button
      @click="resetBill"
      :disabled="billCompleted ? false : true"
      type="button"
      class="w-full rounded-md py-2.5 text-xl uppercase"
      :class="[
        billCompleted
          ? 'bg-theme-strong-cyan text-theme-very-dark-cyan hover:cursor-pointer hover:bg-theme-light-grayish-cyan-hover hover:text-theme-very-dark-cyan'
          : 'bg-theme-bath-green text-theme-very-dark-cyan/30',
      ]"
    >
      Reset
    </button>
  </div>
</template>
