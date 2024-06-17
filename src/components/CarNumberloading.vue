<template>
  <div class="background">
    <div class="content">
      <div class="cardnumberwrap">
        <div class="cardnumbercontent">
          <span>{{ CardNumber }}</span>
        </div>
        <div class="unionwrap"></div>
      </div>
      <div class="loadingwrap">
        <div class="loader"></div>
      </div>
      <div class="txt">Scanning car license</div>
    </div>
  </div>
</template>
<script>
import { useMainStore } from "@/stores/main";
import { chargePileStore } from "@/stores/chargePile";
export default {
  data() {
    return {
      CardNumber: "XXXX-XXX",
    };
  },
  mounted() {
    let self = this;

    setTimeout(function () {
      const mainstore = useMainStore();
      let chargePile=chargePileStore();
      chargePile.RemoteStartTransaction(self).then((res) => {
          if (res.success == true) {
            mainstore.chargepilemode = "charging";
            setTimeout(function () {
             self.$router.push(`/`);
            }, 500);
          } else {
            self.error();
          }
        });
    }, 1000);
  },
  methods: {
    error() {
      const mainstore = useMainStore();
      mainstore.chargepilemode = "standby";
      this.$router.push(`/`);
      console.log("error");
    },
  },
};
</script>
<style scoped>
.unionwrap {
  width: 230px;
  height: 120px;
  position: absolute;
  background: url("../assets/img/Union.png") no-repeat;
  background-size: contain;
  top: 0px;
}
.cardnumberwrap {
  width: 230px;
  height: 120px;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
}
.cardnumbercontent {
  width: 418px;
  height: 208px;
  background: url("../assets/img/CarPlate.png");
  display: flex;
  padding-bottom: 32px;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: absolute;
  top: -90px;
  left: -95px;
}
.cardnumbercontent span {
  font-family: SF Pro;
  font-size: 20px;
  font-weight: 510;
  line-height: 25px;
  margin-top: auto;
  border-radius: 5px;
  box-shadow: 0px 0px 23.8px 0px rgba(255, 255, 255, 0.25) inset;
  background: rgba(255, 255, 255, 0.2);
  padding: 15px 0px;
  text-align: center;
  width: 174.33px;
  height: 55.62px;
  color: white;
}
.txt {
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 510;
  line-height: 22.5px;
  text-align: center;
  color: rgba(107, 107, 107, 1);
  margin-top: 13px;
}
.background {
  background-color: #0000006e;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  z-index: 9999;
}
.content {
  width: 456px;
  height: 370px;

  border-radius: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.loadingwrap {
  position: relative;
  width: 38px;
  height: 38px;
  margin-top: 44px;
}
.loadingwrap img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.loader {
  width: 38px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 2px solid #66ff80;
  animation: l20-1 0.8s infinite linear alternate, l20-2 1.6s infinite linear;
  position: absolute;
}
@keyframes l20-1 {
  0% {
    clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%);
  }
  12.5% {
    clip-path: polygon(
      50% 50%,
      0 0,
      50% 0%,
      100% 0%,
      100% 0%,
      100% 0%,
      100% 0%
    );
  }
  25% {
    clip-path: polygon(
      50% 50%,
      0 0,
      50% 0%,
      100% 0%,
      100% 100%,
      100% 100%,
      100% 100%
    );
  }
  50% {
    clip-path: polygon(
      50% 50%,
      0 0,
      50% 0%,
      100% 0%,
      100% 100%,
      50% 100%,
      0% 100%
    );
  }
  62.5% {
    clip-path: polygon(
      50% 50%,
      100% 0,
      100% 0%,
      100% 0%,
      100% 100%,
      50% 100%,
      0% 100%
    );
  }
  75% {
    clip-path: polygon(
      50% 50%,
      100% 100%,
      100% 100%,
      100% 100%,
      100% 100%,
      50% 100%,
      0% 100%
    );
  }
  100% {
    clip-path: polygon(
      50% 50%,
      50% 100%,
      50% 100%,
      50% 100%,
      50% 100%,
      50% 100%,
      0% 100%
    );
  }
}
@keyframes l20-2 {
  0% {
    transform: scaleY(1) rotate(0deg);
  }
  49.99% {
    transform: scaleY(1) rotate(135deg);
  }
  50% {
    transform: scaleY(-1) rotate(0deg);
  }
  100% {
    transform: scaleY(-1) rotate(-135deg);
  }
}
</style>
