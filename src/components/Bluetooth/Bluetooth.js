import { settingStore } from "@/stores/setting";
import { ref, watch, onMounted,getCurrentInstance } from "vue";


export default function Bluetooth(){
    const Bluetoothdata = ref(false);
    const init = ref(true);
    const instance = getCurrentInstance()
    watch(
      () => Bluetoothdata.value.enabled,
      () => {
        if (init.value == true) {
          let setting = settingStore();
          if (Bluetoothdata.value.chargePointId == "") {
            setting.postapi(instance?.proxy, Bluetoothdata.value).then((res) => {
              Bluetoothdata.value = res.data;
            });
            return;
          }
          setting.putapi(instance?.proxy, Bluetoothdata.value).then((res) => {
            Bluetoothdata.value = res.data;
          });
        }
        init.value = true;
      },
    );
    onMounted(() => {
      let setting = settingStore();
      setting.getapi(instance?.proxy, "BluetoothSetting").then((res) => {
        Bluetoothdata.value = res.data;
      });
    });

    return {
        Bluetoothdata,
        init
    }


}

