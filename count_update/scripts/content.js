(() => {
    /*-----------------時間を表示する-----------------*/
    // 現在の時刻を取得
    const now = new Date();
    let current_hour = now.getHours();

    // 時間範囲を文字列で作成
    const time_range = `${current_hour}時～${current_hour + 1}時`;

    // HTMLの要素に表示
    const time_range_element = document.getElementById('time_range');
    time_range_element.textContent = time_range;

    function updateTimeRange() {
        time_range_element.textContent = `${current_hour}時～${current_hour + 1}時`;
    }

    // 前の時間の表示
    document.getElementById('prev_hour').addEventListener('click', () => {
        current_hour = Math.max(9, current_hour - 1),
            updateTimeRange();
        updateCountDisplay();
    })

    // 次の時間の表示
    document.getElementById('next_hour').addEventListener('click', () => {
        current_hour = Math.min(17, current_hour + 1),
            updateTimeRange();
        updateCountDisplay();
    })

    /*-----------------カウントを表示する-----------------*/
    let gets_data = JSON.parse(localStorage.getItem('product_data')) || [];

    //取得したデータを分けて保存する オブジェクトを初期化する
    let countByHour = {};

    // 取得したデータを識別する
    // isArray() 配列かどうか確認する
    if (Array.isArray(gets_data)) {
        gets_data.forEach(timeObject => {
            const hour = timeObject.time_badge;
            // countByHourオブジェクトに取得した時間のkeyがあるか確認する
            if (!countByHour[hour]) {
                //  ない場合、key に対応する値を入れる
                countByHour[hour] = 1;
            } else {
                countByHour[hour]++;
            }
        })
    }

    function updateCountDisplay() {
        // 現在の時間に対応するカウント数を取得し、表示
        let count = countByHour[current_hour] || 0;
        let count_display_element = document.getElementById('count_display');
        count_display_element.textContent = `⏱${count}個`;
    }

    // 初期表示
    updateCountDisplay();

    /*-----------------編集画面を表示するHTML要素を作成-----------------*/
    // 全体を囲む div
    const edit_div_element = document.createElement("div");

    // テーブル要素
    const edit_table_element = document.createElement("table");

    // ヘッダー行
    const headerRow = document.createElement("tr");
    const headers = ["No.", "作業者", "商品番号", "保存時間", "修正時間"];

    headers.forEach((header) => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
    });

    edit_div_element.appendChild(headerRow);

    // データ行を生成する
    function createDataRow(no, worker, productNo, saveTime) {
        const row = document.createElement("tr");

        // No.
        const tdNo = document.createElement("td");
        tdNo.textContent = no;
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

        // 時間の選択肢
        for (let hour = 9; hour <= 18; hour++) {
            const option = document.createElement("option");
            option.value = hour;
            option.textContent = hour;
            select.appendChild(option);
        }

        tdEditTime.append(select);
        row.appendChild(option);

        return row;
    }

    const sampleData = [
        { no: 1, worker: "作業者データ", productNo: "商品番号データ", savedTime: "保存時間データ" },
        { no: 2, worker: "作業者データ", productNo: "商品番号データ", savedTime: "保存時間データ" },
        { no: 3, worker: "作業者データ", productNo: "商品番号データ", savedTime: "保存時間データ" },
    ];

    sampleData.forEach((data) => {
        const row = createDataRow(data.no, data.worker, data.productNo, data.savedTime);
        edit_table_element.appendChild(row);
    });

    // 保存ボタンを作成
    const edit_storedButton_element = document.createElement("button");
    edit_storedButton_element.textContent = "保存する";

    // 作成した要素をDOMに追加
    edit_div_element.appendChild(edit_table_element);
    edit_div_element.appendChild(edit_storedButton_element);
    document.body.appendChild(edit_div_element);



    const p_element = document.createElement("span");
    p_element.id = "time_range";
    div_element.appendChild(p_element);

    // button要素(prev_hour)をつくる　div要素の子要素に追加する
    const prev_button = document.createElement("button");
    prev_button.id = "prev_hour";
    prev_button.classList.add("time_button");
    prev_button.textContent = "←";
    div_element.appendChild(prev_button);

    // p要素をつくる　div要素の子要素に追加する
    const count_display = document.createElement("p");
    count_display.id = "count_display";
    count_display.style = "display:inline-block; margin:0;";
    div_element.appendChild(count_display);

    //button要素(next_hour)をつくる div要素の子要素に追加する
    const next_button = document.createElement("button");
    next_button.id = "next_hour";
    next_button.classList.add("time_button");
    next_button.textContent = "→";
    div_element.appendChild(next_button);

    // 並べる予定の.navbar-rightクラスの要素を取得する
    const navbar_parent_element = document.querySelector(".navbar-right");

    //  ul要素をつくる (子要素に追加すれば、つくる必要ないかもしれない)
    const badge = document.createElement("ul");
    badge.classList.add("navbar-form", "navbar-right");
    badge.appendChild(div_element);

    // navbar_parent_elementの子要素に追加する
    navbar_parent_element.appendChild(badge);
})
    ();

/*-----------------時間を表示するHTML要素を作成-----------------*/

// li要素をつくる
const div_element = document.createElement("li");

// span要素をつくる　div要素の子要素に追加する
const p_element = document.createElement("span");
p_element.id = "time_range";
div_element.appendChild(p_element);

// button要素(prev_hour)をつくる　div要素の子要素に追加する
const prev_button = document.createElement("button");
prev_button.id = "prev_hour";
prev_button.classList.add("time_button");
prev_button.textContent = "←";
div_element.appendChild(prev_button);

// p要素をつくる　div要素の子要素に追加する
const count_display = document.createElement("p");
count_display.id = "count_display";
count_display.style = "display:inline-block; margin:0;";
div_element.appendChild(count_display);

//button要素(next_hour)をつくる div要素の子要素に追加する
const next_button = document.createElement("button");
next_button.id = "next_hour";
next_button.classList.add("time_button");
next_button.textContent = "→";
div_element.appendChild(next_button);

// 並べる予定の.navbar-rightクラスの要素を取得する
const navbar_parent_element = document.querySelector(".navbar-right");

//  ul要素をつくる (子要素に追加すれば、つくる必要ないかもしれない)
const badge = document.createElement("ul");
badge.classList.add("navbar-form", "navbar-right");
badge.appendChild(div_element);

// navbar_parent_elementの子要素に追加する
navbar_parent_element.appendChild(badge);

