/*-----------------編集画面を表示するHTML要素を作成-----------------*/

// 全体を囲む div
const edit_div_element = document.createElement("div");
edit_div_element.style.display = "none";

// テーブル要素
const edit_table_element = document.createElement("table");
// edit_table_element.classList.add("");

// テーブルボディ
const edit_tableBody_element = document.createElement("tbody");

// ヘッダー行
const headerRow = document.createElement("tr");
const headers = ["No.", "作業者", "商品番号", "保存時間", "修正時間"];

headers.forEach((header) => {
    const th = document.createElement("th");

    const th_styles = {
        borderBottom: "solid 2px #fb5144",
        padding: "10px 0"
    };

    Object.assign(th.style, th_styles);

    th.textContent = header;
    headerRow.appendChild(th);
});

// edit_table_element.appendChild(headerRow);
edit_tableBody_element.appendChild(headerRow);


// データ行のカウンタを定義
let rowCounter = 1;

// データ行を生成する
function createDataRow(worker, productNo, saveTime, time_badge) {
    const row = document.createElement("tr");

    // No.
    const tdNo = document.createElement("td");
    tdNo.textContent = rowCounter++
    row.appendChild(tdNo);

    // 作業者
    const tdWorker = document.createElement("td");
    tdWorker.textContent = worker;
    row.appendChild(tdWorker);

    // 商品番号
    const tdProductNo = document.createElement("td");
    tdProductNo.textContent = productNo;
    row.appendChild(tdProductNo);

    // 保存時間
    const tdSaveTime = document.createElement("td");
    tdSaveTime.textContent = saveTime;
    row.appendChild(tdSaveTime);

    // 修正時間
    const tdEditTime = document.createElement("td");
    const select = document.createElement("select");
    select.id = "edit_time_select";

    const option = document.createElement("option");

    // 時間の選択肢
    // 文字列から 時　分　秒を取り出す
    let time_array = saveTime.match(/(\d{1,2}):(\d{2}):(\d{2})/);

    // match() から取り出した配列の要素の2番目(時間要素)を使う
    time_badge = time_array ? time_array[1] : 0;

    let current_hour = time_badge;
    let ago_hour = time_badge - 1;

    // optionを並び替えるための配列
    let options = [];

    // 現在の時間のオプションを追加
    let optionCurrent = document.createElement('option');
    optionCurrent.value = current_hour;
    optionCurrent.textContent = `${current_hour}:00`;
    options.push(optionCurrent);

    // 一時間前の時間のオプションを追加
    let optionAgo = document.createElement('option');
    optionAgo.value = ago_hour;
    optionAgo.textContent = `${ago_hour}:00`;
    options.push(optionAgo);

    // オプションを昇順に並び替え
    options.sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));

    // 並び替えたオプションを select に追加
    options.forEach(option => select.appendChild(option));

    select.value = current_hour;

    tdEditTime.append(select);
    row.appendChild(tdEditTime);

    return row;
}

const td_styles = {
    borderBottom: "solid 2px #ddd",
    textAlign: "center",
    padding: "10px 0"
};

// サンプルのデータを保存する
let sampleData = [];

localStorage.setItem('product_data', JSON.stringify({ employee_id: "横山孝大", product_no: "2100225677206", time_stamp: '2024/10/29 15:45:50', time_badge: '' }));

let getsSampleData = JSON.parse(localStorage.getItem('product_data'));

sampleData.push(getsSampleData);

sampleData.forEach((data) => {
    const row = createDataRow(data.employee_id, data.product_no, data.time_stamp);
    Object.assign(row.style, td_styles);
    edit_tableBody_element.appendChild(row);
});


// 保存ボタンを作成
const edit_storedButton_element = document.createElement("button");
edit_storedButton_element.classList.add("storedButton");
edit_storedButton_element.textContent = "保存";

// 保存ボタン押したときの動作
edit_storedButton_element.addEventListener('click', () => {

    // 修正された時間を取得する
    const selectedTime = document.getElementById('edit_time_select').value;

    // 現在の保存されているデータをローカルストレージから取得
    let currentData = JSON.parse(localStorage.getItem('product_data'));

    // time_badge を選択されている時間に更新    
    currentData.time_badge = selectedTime;

    // 更新したデータをローカルストレージに保存
    localStorage.setItem('product_data', JSON.stringify(currentData));

})

// 閉じるボタンを作成

// 閉じるボタンを押したときの動作


// 作成した要素をDOMに追加
edit_table_element.appendChild(edit_tableBody_element);
edit_div_element.appendChild(edit_table_element);
edit_div_element.appendChild(edit_storedButton_element);

const table_styles = {
    width: "100%",
    borderSpacing: "0",
};

Object.assign(edit_table_element.style, table_styles);

// edit_div_element.style.display = "none"; // 初期状態では非表示
edit_div_element.style.position = "fixed"; // 固定位置
edit_div_element.style.top = "30%"; // 垂直中央
edit_div_element.style.left = "50%"; // 水平中央
edit_div_element.style.transform = "translate(-50%, -50%)"; // 完全に中央に配置
edit_div_element.style.width = "50%"; // 幅を400pxに設定
edit_div_element.style.height = "50%"; // 高さを300pxに設定
edit_div_element.style.backgroundColor = "#fff"; // 背景色（任意）
edit_div_element.style.border = "2px solid #ddd"; // 枠線（任意）
edit_div_element.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"; // 影を付けて立体感を出す（任意）


document.body.appendChild(edit_div_element);
