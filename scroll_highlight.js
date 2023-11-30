<style>
  .line {
    position: relative;
  }

  .line-mask {
    position: absolute;
    top: 0;
    right: 0;
    background-color: #0f0f0f;
    opacity: 0.95;
    height: 100%;
    width: 100%;
    z-index: 2;
  }
</style>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.8.0/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.8.0/ScrollTrigger.min.js"></script>
<script src="https://unpkg.com/split-type"></script>
<script>
  // Função para executar a animação
  function createAnimation() {
    $(".line").each(function (index) {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: this,
          start: "top 50%",  // Ajuste conforme necessário
          end: "bottom 50%",  // Ajuste conforme necessário
          scrub: 1,
          markers: false  // Adiciona marcadores para depuração
        }
      });
      tl.to($(this).find(".line-mask"), {
        width: "0%",
        duration: 1
      });
    });
  }

  // Função para dividir o texto
  function runSplit() {
    const elementsToSplit = $(".split-lines");
    let instancesOfSplit = [];

    elementsToSplit.each(function (index) {
      let currentElement = $(this);
      instancesOfSplit[index] = new SplitType(currentElement, {
        types: "lines, words"
      });
    });

    $(".line").each(function (index) {
      $(this).append("<div class='line-mask'></div>");
    });
  }

  // Atualização ao redimensionar a janela
  let windowWidth = $(window).innerWidth();
  window.addEventListener("resize", function () {
    if (windowWidth !== $(window).innerWidth()) {
      windowWidth = $(window).innerWidth();
      elementsToSplit.each(function (index) {
        instancesOfSplit[index].revert();
      });
      runSplit();
      createAnimation();
    }
  });

  // Registrar o plugin ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Executar as funções iniciais
  runSplit();
  createAnimation();
</script>
