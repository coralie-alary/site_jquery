$(function() {
  // déclare des variables dans lesquelles on capture
  //les éléments du menu

  // je capture les enfants li du main menu ul
  var $mainMenuItems = $("#main-menu ul").children("li");
  var $totalMainMenuItems = $mainMenuItems.length;
  // l'animation se trouve à l'index 2 au départ (sur Jessica Alba)
  var $openedIndex = 2;

  //-----------------------------------------------------------
  // fonction init
  var init = function() {
      bindEvents();

      if (validIndex($openedIndex)) {
        // dans la liste des items celui = à openedIndex
        $animateItem($mainMenuItems.eq($openedIndex), true, 700);
      }
    },
    //attache les événements de mon animation
    // sur le click de l'image
    bindEvents = function() {
      // quand je clique sur la div images que l'action se passe
      $mainMenuItems.children(".images").click(function() {
        // NOUVEL INDEX sur lequel je viens de cliquer
        var $newIndex = $(this)
          .parent()
          .index();
        var $item = $mainMenuItems.eq($newIndex);
        checkAndAnimateItem($newIndex);
      });

      $(".button").hover(
        // quand je rentre sur le bouton
        // on ajoute la classe hovered
        function() {
          $(this).addClass("hovered");
        },
        // quand je pars du bouton
        function() {
          $(this).removeClass("hovered");
        }
      );

      // les boutons sont reliés au menu
      $(".button").click(function() {
        var $newIndex = $(this).index();
        checkAndAnimateItem($newIndex);
      });
    };

  //-------------------------------------------------------------
  // est ce que l'index est valide?
  validIndex = function(indexToCheck) {
    // index possible 0, 1, 2, 3, 4
    // index super ou = 0 et inf à totatMenuItems
    return indexToCheck >= 0 && indexToCheck < $totalMainMenuItems;
  };

  //-------------------------------------------------------------
  // fonction animateItem (3arguments)
  //1 l'item que je veux animer,
  //2 actions d'ouverture ou de fermeture
  //3 vitesse
  ($animateItem = function($item, toOpen, speed) {
    var $colorImage = $item.find(".color");
    // toOpen ? vrai ou faux ?  si vrai 420px         si faux 140px
    var $itemParam = toOpen ? { width: "420px" } : { width: "140px" };

    // quand j'ouvre je veux que le left soit de 0px et
    // quand je ferme je ne veux pas le voir 140px
    var $colorImageParam = toOpen ? { left: "0px" } : { left: "140px" };

    $colorImage.animate($colorImageParam, speed);
    $item.animate($itemParam, speed);
  }),
    (checkAndAnimateItem = function(indexToCheckAndAnimate) {
      if ($openedIndex === indexToCheckAndAnimate) {
        // ferme l'index ouvert
        // si l'index sur lequel je viens de cliquer = à l'index déjà ouvert
        // je dois fermé avec $animateItem false
        $animateItem($mainMenuItems.eq(indexToCheckAndAnimate), false, 250);
        // code quand aucun index ouvert
        $openedIndex = -1;
        // sinon on verifie l'index
      } else {
        if (validIndex(indexToCheckAndAnimate)) {
          // je ferme l'index ouvert
          $animateItem($mainMenuItems.eq($openedIndex), false, 250);
          // j'ouvre le nouveau
          $openedIndex = indexToCheckAndAnimate;
          // et j'anime l'ouverture du nouvel index
          $animateItem($mainMenuItems.eq($openedIndex), true, 250);
        }
      }
    });

  init();
});
