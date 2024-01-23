// 버튼 클릭 시 맨 위로 이동
const $topBtn = document.querySelector(".moveTopBtn");
$topBtn.onclick = () =>
{
  window.scrollTo({ top: 0, behavior: "smooth"});
};

// layer 생성 및 삭제
// $(".subscribe").click(function (){
//   $(".layer").css("display","block");
// });
// $(".close").click(function (){
//   $(".layer").css("display","none");
// });

const subscribe = document.querySelector(".subscribe");
const layer = document.querySelector(".layer");
const close = document.querySelector(".close");

subscribe.addEventListener("click", (event)=>{
  event.preventDefault();
  layer.classList.toggle("show");
});

close.addEventListener("click", (event)=>{
  event.preventDefault();
  layer.classList.remove("show");
});







// 지도 열기
var mapContainer = document.querySelector('.map'), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
    level: 3 // 지도의 확대 레벨
  };
// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);








// 이미지 로더
const imageList = document.querySelector(".image-list");
let pageToFetch = 1;

async function fetchImages(pageNum){
  try {
    const response = await fetch('https://picsum.photos/v2/list?page='+ 1 +'&limit=10');
    if (!response.ok) {
      throw new Error('네트워크 응답에 문제가 있습니다.');
    }

    const datas = await response.json();
    console.log(datas);

    makeImageList(datas);

  } catch (error) {
    console.error('데이터를 가져오는데 문제가 발생했습니다 :', error);
  }
}

function makeImageList(datas){
  datas.forEach((item)=>{
    imageList.innerHTML = imageList.innerHTML + "<li><img src="+ item.download_url +" alt=''></li>";
  });
}

window.addEventListener('scroll', ()=> {
  // 스크롤이 상단으로부터 얼마나 이동했는지 알아야함. (뷰포트 높이 + 스크롤된 길이)
  // 화면에 로딩된 페이지의 전체 높이
  // 뷰포트의 높이 + 스크롤된 길이 + 10 == 화면에 로딩된 페이지의 전체 높이

  if(window.innerHeight + document.documentElement.scrollTop + 10 >=
    document.documentElement.offsetHeight){
    fetchImages(pageToFetch ++);
  }
});

fetchImages();
