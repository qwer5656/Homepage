<template>
  <v-container class="py-6 chargepointrateplanwrap" max-width="900">
    <v-form ref="formRef">
      <v-card elevation="3">
        <v-card-title class="bg-primary text-white">
          {{ $t("ChargePointRatePlanPage.title") }}
        </v-card-title>

        <v-card-text>
          <br />

          <!-- 基本電價 -->
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.electricityRatePlan.basePrice"
                :label="$t('ChargePointRatePlanPage.basePrice')"
                type="number"
                variant="outlined"
                :rules="[numberRequired]"
              />
            </v-col>
          </v-row>

          <v-divider class="my-5" />

          <!-- 分時電價 -->
          <div
            class="d-flex flex-column flex-sm-row justify-space-between align-sm-center mb-3 ga-3"
          >
            <h3>
              {{ $t("ChargePointRatePlanPage.timeRate") }}
            </h3>

            <v-btn color="green" block class="d-sm-none" @click="addRate">
              {{ $t("ChargePointRatePlanPage.addTimeRate") }}
            </v-btn>

            <v-btn color="green" class="d-none d-sm-flex" @click="addRate">
              {{ $t("ChargePointRatePlanPage.addTimeRate") }}
            </v-btn>
          </div>

          <div class="table-wrapper">
            <v-table>
              <thead>
                <tr>
                  <th>{{ $t("ChargePointRatePlanPage.periodName") }}</th>
                  <th>{{ $t("ChargePointRatePlanPage.startTime") }}</th>
                  <th>{{ $t("ChargePointRatePlanPage.endTime") }}</th>
                  <th>{{ $t("ChargePointRatePlanPage.pricePerKwh") }}</th>
                  <th>{{ $t("Common.action") }}</th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="(item, index) in form.electricityRatePlan.timeRates"
                  :key="item.id || index"
                >
                  <td class="rate-column">
                    <v-text-field
                      v-model="item.periodName"
                      density="compact"
                      variant="outlined"
                      hide-details
                      :rules="[required]"
                    />
                  </td>

                  <td class="rate-column">
                    <v-text-field
                      v-model="item.startTime"
                      type="time"
                      density="compact"
                      variant="outlined"
                      hide-details
                      :rules="[required]"
                    />
                  </td>

                  <td class="rate-column">
                    <v-text-field
                      v-model="item.endTime"
                      type="time"
                      density="compact"
                      variant="outlined"
                      hide-details
                      :rules="[required]"
                    />
                  </td>

                  <td class="rate-column">
                    <v-text-field
                      v-model="item.pricePerKwh"
                      type="number"
                      density="compact"
                      variant="outlined"
                      hide-details
                      :rules="[required]"
                    />
                  </td>

                  <td class="delete-column">
                    <v-btn
                      :icon="mdiDelete"
                      color="red"
                      variant="text"
                      @click="removeRate(index)"
                    />
                  </td>
                </tr>
              </tbody>
            </v-table>
          </div>
        </v-card-text>

        <v-card-actions class="justify-end pa-4">
          <v-btn color="green" block class="save-btn" @click="save">
            {{ $t("Common.save") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script setup>
import { mdiDelete } from "@mdi/js";
import { ref, onMounted, computed } from "vue";
import { electricityStore } from "@/stores/electricity";
import { ResultStore } from "@/stores/result";
const electricity = electricityStore();
const resultStore = ResultStore();
const enableTimeRate = ref(false);
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const formRef = ref(null);
const form = ref({
  chargePointId: "",
  ratePlanId: 0,
  electricityRatePlan: {
    planName: "",
    basePrice: 0,
    effectiveStart: "2026-07-07T06:14:12.864Z",
    effectiveEnd: "2026-07-07T06:14:12.864Z",
    isActive: true,
    scope: 0,
    isDefault: true,
    timeRates: [],
  },
});
const addRate = () => {
  if (form.value.electricityRatePlan.timeRates.length >= 3) {
    resultStore.errorres(t("ChargePointRatePlanPage.maxTimeRates"));
    return;
  }

  form.value.electricityRatePlan.timeRates.push({
    periodName: "",
    startTime: "",
    endTime: "",
    pricePerKwh: 0,
  });
};

const removeRate = (index) => {
  form.value.electricityRatePlan.timeRates.splice(index, 1);
};

const save = async () => {
  const { valid } = await formRef.value.validate();

  if (!valid) {
    return;
  }

  electricity.postapi(form.value).then((res) => {
    console.log(res);
    if (res.success == false) {
      resultStore.errorres(res.message);
      return;
    }
    form.value = res.data;
    resultStore.successres();
  });
};
onMounted(() => {
  electricity.getapi().then((res) => {
    if (res.data == null) {
      return;
    }
    console.log(res);
    form.value = res.data;
  });
});

// 通用必填
const required = (value) => {
  if (value === null || value === undefined || value === "") {
    return "此欄位必填";
  }

  return true;
};

// 數字必填
const numberRequired = (value) => {
  if (value === null || value === undefined || value === "") {
    return "請輸入數值";
  }

  return true;
};
</script>

<style scoped>
.chargepointrateplanwrap .v-card-title {
  background-color: green !important;
}

.chargepointrateplanwrap .v-card {
  background-color: #222222cf;

  color: white;
}

.chargepointrateplanwrap .v-table {
  background-color: #222222cf;

  color: white;
}

.chargepointrateplanwrap .v-field__input {
  color: white;
}

/* table RWD */

.table-wrapper {
  width: 100%;

  overflow-x: auto;
}

.rate-column {
  min-width: 160px;
}

.delete-column {
  min-width: 70px;

  text-align: center;
}

.save-btn {
  max-width: 160px;
}

/* Tablet */

@media (max-width: 960px) {
  .chargepointrateplanwrap {
    padding: 16px !important;
  }
}

/* Mobile */

@media (max-width: 600px) {
  .chargepointrateplanwrap {
    padding: 8px !important;
  }

  .chargepointrateplanwrap .v-card-title {
    font-size: 18px;
  }

  .rate-column {
    min-width: 180px;
  }

  .save-btn {
    max-width: none;
  }
}
</style>
