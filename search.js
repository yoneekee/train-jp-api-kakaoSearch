const thumbList = document.querySelector(".list");
const btnSearch = document.querySelector(".btn-search");
const searchTxt = document.querySelector(".search-txt");
const recentSearchWord = document.querySelector(".recent-search-word");
const recentX = document.querySelector(".recentX");

// 배열
const recentSearchWordArray =
  JSON.parse(localStorage.getItem("recentSearchWord")) ?? [];
console.log(recentSearchWordArray);
if (recentSearchWordArray !== null) {
  recentSearchWordArray.forEach(function (item, idx) {
    recentSearchWord.innerHTML += `<li>${item}</li>`;
  });
}

// 엔터 눌렀을 때 검색됨
searchTxt.addEventListener("keyup", (e) => {
  thumbList.innerHTML = "";
  const txt = searchTxt.value;
  if (e.keyCode == 13) {
    if (!recentSearchWordArray.includes(txt)) {
      recentSearchWordArray.push(txt);
      recentSearchWord.innerHTML += `<li>${txt}</li>`;

      localStorage.setItem(
        "recentSearchWord",
        JSON.stringify(recentSearchWordArray)
      );
      //세션 스토리지는 웹페이지의 세션이 끝날 때 저장된 데이터가 지워지는 반면에,
      //로컬 스토리지는 웹페이지의 세션이 끝나더라도 데이터가 지워지지 않습니다.
    }
    searchImg(txt);
    console.log(recentSearchWordArray);
  }
});

// 클릭했을 때 검색됨
btnSearch.addEventListener("click", () => {
  thumbList.innerHTML = "";
  const txt = searchTxt.value;
  if (!recentSearchWordArray.includes(txt)) {
    recentSearchWordArray.push(txt);
    recentSearchWord.innerHTML += `<li>${txt}</li>`;

    localStorage.setItem(
      "recentSearchWord",
      JSON.stringify(recentSearchWordArray)
    );
  }
  searchImg(txt);
  console.log(recentSearchWordArray);
});

function searchImg(searchTxt) {
  const myFetch = fetch(
    `http://dapi.kakao.com/v2/search/image?query=${searchTxt}`,
    {
      headers: {
        Authorization: ``,
      },
    }
  );

  myFetch
    .then(function (response) {
      //console.log("뉴진스 검색 결과 이미지 정상적으로 가져옴");
      //console.log(response);
      return response.json(); // response가 json으로 바뀌는 것을 promise함
    })
    .then((result) => {
      // 여기서 반복문 돌려서 화면에 뿌리기
      result.documents.forEach((item, idx) => {
        //console.log(idx + " : " + item.thumbnail_url);
        thumbList.innerHTML += `<li><a href="${item.image_url}" 
      data-fancybox="gallery"
      data-caption="${item.doc_url}"
      data">
      <img src="${item.thumbnail_url}"/></a></li>`;
      });
    })
    .catch(function () {
      console.log("문제 발생했음");
    })
    .finally(function () {
      console.log("무조건 실행되는 파트");
    });
  console.log(myFetch);
}

const recentAdd = function (txt) {
  if (!recentWords.includes(txt)) {
    recentWords.push(txt);
    recentSearchWord.innerHTML += `<li>${txt}<span class="recentX">x</span></li>`;
  }
};

const recentDelete = function (txt) {
  recentSearchWord.innerHTML -= `<li>${txt}<span class="recentX">x</span></li>`;
};

recentX.addEventListener("click", function () {
  const mother = recentX.parentNode;
  alert(mother.nodeName);
});
