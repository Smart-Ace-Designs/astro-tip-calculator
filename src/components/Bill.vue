<script setup lang="ts">
import { ref } from "vue";
import { bill, party, customTip, standardTip, tip } from "@/stores/store";
import { useComputedStore } from "@/composables/useComputedStore";

import dollar from "../assets/icon-dollar.svg?url";
import person from "../assets/icon-person.svg?url";

import StandardTip from "./StandardTip.vue";
import CustomTip from "./CustomTip.vue";

const billValue = useComputedStore(bill);
const invalidBillSize = ref<boolean>(false);
const handleBillSizeChange = (): void => {
  invalidBillSize.value = !(billValue.value === "" || billValue.value > 0);
};

const partyValue = useComputedStore(party);
const invalidPartySize = ref<boolean>(false);
const handlePartySizeChange = (): void => {
  const number = Number(partyValue.value);
  invalidPartySize.value = !(partyValue.value === "" || (Number.isInteger(number) && number > 0));
};

const customTipValue = useComputedStore(customTip);
const clearCustomTip = (): void => {
  customTipValue.value = "";
};
const testCustomTip = (): void => {
  if (customTipValue.value === "") {
    standardTipValue.value = "";
    tip.set("");
  }
};

const standardTipsTypes = ["5", "10", "15", "25", "50"];
const standardTipValue = useComputedStore(standardTip);
const clearStandardTip = (): void => {
  standardTipValue.value = "";
};

const updateTip = (tipValue: string): void => {
  standardTipValue.value = tipValue;
  tip.set(tipValue);
};
</script>

<template>
  <section class="flex h-full flex-col justify-between px-8 pt-8 pb-4 lg:p-10 lg:pr-4">
    <!-- Bill Amount -->
    <div class="relative mb-8 flex flex-col lg:mb-6">
      <div class="flex justify-between">
        <label for="bill" class="mb-2 text-theme-dark-grayish-cyan">Bill</label>
        <p v-if="invalidBillSize" class="mb-2 text-orange-400">Invalid input</p>
      </div>
      <input
        v-model="billValue"
        id="bill"
        type="text"
        name="bill"
        class="rounded-md bg-theme-very-light-grayish-cyan py-1 pr-4 pl-10 text-right text-[25px] caret-theme-strong-cyan placeholder:mr-1 placeholder:text-theme-dark-grayish-cyan/50 hover:cursor-pointer focus:outline-theme-strong-cyan"
        :class="{ '!focus:outline-none outline-orange-400!': invalidBillSize }"
        maxlength="6"
        placeholder="0"
        @input="handleBillSizeChange"
      />
      <img :src="dollar" alt="Dolar sign" class="absolute top-12 left-4" />
    </div>

    <!-- Tip Selection -->
    <div class="mb-8 flex flex-col lg:mb-6">
      <p class="mb-4 text-theme-dark-grayish-cyan">Select Tip %</p>
      <div class="grid grid-cols-2 gap-4 lg:grid-cols-3" id="tip-selector">
        <StandardTip
          v-for="type in standardTipsTypes"
          :key="type"
          :tip="type"
          :is-active="standardTipValue === type"
          v-model="standardTipValue"
          @clear-custom-tip="clearCustomTip"
          @update-tip="updateTip"
        />
        <CustomTip
          v-model="customTipValue"
          @clear-standard-tip="clearStandardTip"
          @test-custom-tip="testCustomTip"
        />
      </div>
    </div>

    <!-- Party Size -->
    <div class="relative mb-4 flex flex-col">
      <div class="flex justify-between">
        <label for="people" class="mb-2 text-theme-dark-grayish-cyan">Number of People</label>
        <p v-if="invalidPartySize" class="mb-2 text-orange-400">Invalid input</p>
      </div>
      <input
        v-model="partyValue"
        id="people"
        type="text"
        name="people"
        class="rounded-md bg-theme-very-light-grayish-cyan py-1 pr-4 pl-10 text-right text-[25px] caret-theme-strong-cyan placeholder:mr-1 placeholder:text-theme-dark-grayish-cyan/50 hover:cursor-pointer focus:outline-theme-strong-cyan"
        :class="{ '!focus:outline-none outline-orange-400!': invalidPartySize }"
        maxlength="3"
        placeholder="0"
        @input="handlePartySizeChange"
      />
      <img :src="person" alt="Dinner party" class="absolute top-12 left-4" />
    </div>
  </section>
</template>
