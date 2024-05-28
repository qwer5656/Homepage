<template>
  <div class="qrcodegwrap">
    <div class="container">
      <div class="backicon" @click="previous()">
        <img src="../assets/img/Previous.png" alt="" />
        <span>Back</span>
      </div>
      <div>
        <div class="imgwrap">
          <img src="../assets/img/Qrcodeimg.png" alt="" />
          <div class="info">Please scan QR code</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  setup() {},
  data() {
    return {
      val: false,
    };
  },
  components: {},
  methods: {
    previous() {
      this.$router.go(-1);
    },
  },
};
</script>
<style scoped>
.qrcodegwrap {
  display: flex;
  justify-content: center;
}
.backicon {
  cursor: pointer;
}
.qrcodegwrap .backicon img {
  vertical-align: middle;
}
.qrcodegwrap .backicon span {
  margin-left: 15px;
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: left;
  vertical-align: middle;
  color: white;
}
.container {
  width: 782px;
  height: 445px;
}
.imgwrap {
  margin-top: 101px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 101px;
}
.imgwrap img {
  width: 202px;
  height: 202px;
}
.imgwrap .info {
  font-family: SF Pro;
  font-size: 14px;
  font-weight: 510;
  line-height: 17.5px;
  text-align: center;
  color: rgba(107, 107, 107, 1);
}
@media (max-width: 576px) {
  .backicon {
    padding-left: 10px;
  }
}
</style>
