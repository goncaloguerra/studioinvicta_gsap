
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

