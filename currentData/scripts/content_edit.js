(() => {
    function main() {
        // searchUpdateBtnを繰り返す interval_id にタイマーIDを格納する
        let interval_id = setInterval(searchUpdateBtn, 100);

        let update_btn = false;

        function searchUpdateBtn() {
            // ページ全体から 更　新と書かれた aタグを探し、結果のリストを返す
            try {
                const anchor_element = document.evaluate(
                    "/html/body//a[text()=' 更　新 ']",
                    document,
                );
                // evaluate() で見つかったリストの要素を取り出す
                update_btn = anchor_element.iterateNext();
            } catch {
            }

            // 更　新 ボタンがみつかったとき
            if (update_btn) {

                update_btn.addEventListener('click', () => {

                    // 作業者名を取得 "株式会社SASAGE","/","様" の文字列を削除する
                    let employee_id = document.querySelector('a.name').textContent.replace(/株式会社SASAGE|\/|様/g, '').trim();

                    // 製品番号を取得
                    let product_no = document.querySelector('#product_code').value;

                    // TimeStampを取得
                    let time_stamp = new Date().toLocaleString();

                    //取得したデータをローカルストレージに保存する
                    saveProduct(employee_id, product_no, time_stamp);
                });
                clearInterval(interval_id);
                console.log("setIntervalを終了します。");
            }
        } // searchUpdateBtn()

        function saveProduct(employee_id, product_no, time_stamp) {

            // ローカルストレージから既存データを取得し配列にする
            let stored_data = JSON.parse(localStorage.getItem('product_data')) || [];

            // 今日の日付を取得
            const today = new Date().toDateString();

            // 今日の日付以外のデータを削除
            stored_data = stored_data.filter(entry => {
                const storedDate = new Date(entry.time_stamp).toDateString();
                return storedDate === today;
            });

            // 同じ製品番号があるか確認する 
            let product_exists = stored_data.some(entry => entry.product_no === product_no);

            // 製品番号が存在しない場合のみ保存
            if (!product_exists) {

                // 文字列から 時　分　秒を取り出す
                let time_array = time_stamp.match(/(\d{1,2}):(\d{2}):(\d{2})/);

                // match() から取り出した配列の要素の2番目(時間要素)を使う
                let time_badge = time_array ? time_array[1] : 0;

                // 新しいデータのオブジェクトをつくる
                const new_data = {
                    employee_id: employee_id,
                    product_no: product_no,
                    time_stamp: time_stamp,
                    time_badge: time_badge
                };

                // 配列に新しく作ったデータをプッシュする
                stored_data.push(new_data);

                // データをローカルストレージに保存  key product_data value stored_data[{},{},{}]
                localStorage.setItem('product_data', JSON.stringify(stored_data));
                console.log(`Data saved: ${employee_id}, ${product_no}, ${time_stamp}`);
            } else {
                console.log(`Product number ${product_no} already exists, not saved.`);
            }
        }
    }
    main();

    /*-----------------HTML要素を作成-----------------*/

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


    /*-----------------時間の情報を取得する-----------------*/

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
    })

    // 次の時間の表示
    document.getElementById('next_hour').addEventListener('click', () => {
        current_hour = Math.min(17, current_hour + 1),
            updateTimeRange();
    })

    /*-----------------時間の情報を表示する-----------------*/

    let gets_data = JSON.parse(localStorage.getItem('product_data')) || [];

    //取得したデータを分けて保存する
    let countByHour = {};

    // 取得したデータを識別する
    if (Array.isArray(gets_data)) {
        gets_data.forEach(timeObject => {

            // let getTime = timeObject.time_stamp;
            // let hour = (new Date(getTime).getHours());
            let hour = timeObject.time_badge;

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

    // 前の時間の表示
    document.getElementById('prev_hour').addEventListener('click', () => {
        updateCountDisplay();
    })

    // 次の時間の表示
    document.getElementById('next_hour').addEventListener('click', () => {
        updateCountDisplay();
    })


    /*-----------------追加した内容-----------------*/
    /*-----------------編集画面を表示するHTML要素を作成-----------------*/

    // 全体を囲む div

    const container_element = document.createElement("div");

    // 時間を表示する部分をつくる

    const edit_div_element = document.createElement("div");
    edit_div_element.classList.add("editScreen");
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

    edit_tableBody_element.appendChild(headerRow);

    // データ行のカウンタを定義
    let rowCounter = 1;

    // データ行を生成する
    function createDataRow(employee_id, productNo, saveTime, time_badge) {
        if (employee_id && productNo && saveTime && time_badge) {
            const row = document.createElement("tr");

            // No.
            const tdNo = document.createElement("td");
            tdNo.textContent = rowCounter++
            row.appendChild(tdNo);

            // 作業者
            const tdWorker = document.createElement("td");
            tdWorker.textContent = employee_id;
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

            // 追加した箇所

            // 行に`employee_id` と `productNo` をデータ属性として保存
            row.setAttribute("data-employee-id", employee_id);
            row.setAttribute("data-product-no", productNo);

            return row;
        }
        return null;
    }

    // 保存ボタンを作成
    const edit_storedButton_element = document.createElement("button");
    edit_storedButton_element.classList.add("editdButton");
    edit_storedButton_element.textContent = "保存";

    // 保存ボタン押したときの動作
    edit_storedButton_element.addEventListener('click', () => {

        // 修正された時間を取得する
        const selectedTime = document.getElementById('edit_time_select').value;
        console.log("修正された時間の値です。" + selectedTime);

        // 現在の保存されているデータをローカルストレージから取得
        let currentData = JSON.parse(localStorage.getItem('product_data'));

        // time_badge を選択されている時間に更新けど対象の商品番号をどうやって選択するか
        // 同じ行の商品番号を取得して、元のデータで見つかったものに代入する

        // 時間を更新
        // 対象の商品番号のtime_badge = selectedTime;


        // 更新したデータをローカルストレージに保存
        localStorage.setItem('product_data', JSON.stringify(currentData));

        close_editScreen();
    });

    // 編集画面を表示する
    let edit_openButton = document.getElementById("count_display");

    // 編集画面を表示するを押したとき
    edit_openButton.addEventListener('click', () => {
        open_editScreen();
    })

    function open_editScreen() {
        if (edit_div_element.style.display === 'none') {

            edit_div_element.style.display = 'block';  // 表示する
        } else {

        }



        // 編集画面を非表示にする
        const edit_closeButton_element = document.createElement("button");
        edit_table_element.classList.add("editButton");
        edit_closeButton_element.textContent = "閉じる";


        // 閉じるボタンを押したときの動作
        edit_closeButton_element.addEventListener('click', () => {
            close_editScreen();
        })

        function close_editScreen() {
            edit_div_element.style.display = "none";
        }

        // 作成した要素をDOMに追加
        edit_table_element.appendChild(edit_tableBody_element);
        edit_div_element.appendChild(edit_table_element);
        edit_div_element.appendChild(edit_storedButton_element);
        edit_div_element.appendChild(edit_closeButton_element);

        const table_styles = {
            width: "100%",
            borderSpacing: "0",
        };
        // Object.assign(row.style, td_styles);
        const td_styles = {
            borderBottom: "solid 2px #ddd",
            textAlign: "center",
            padding: "10px 0"
        };

        Object.assign(edit_table_element.style, table_styles);

        // edit_div_element.style.display = "none"; // 初期状態では非表示
        edit_div_element.style.position = "fixed"; // 固定位置
        edit_div_element.style.top = "50%"; // 垂直中央
        edit_div_element.style.left = "50%"; // 水平中央
        edit_div_element.style.transform = "translate(-50%, -50%)"; // 完全に中央に配置
        edit_div_element.style.width = "50%"; // 幅を400pxに設定
        edit_div_element.style.height = "50%"; // 高さを300pxに設定
        edit_div_element.style.backgroundColor = "#fff"; // 背景色（任意）
        edit_div_element.style.border = "2px solid #ddd"; // 枠線（任意）
        edit_div_element.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"; // 影を付けて立体感を出す（任意）


        document.body.appendChild(edit_div_element);

    }
    let rowData = JSON.parse(localStorage.getItem('product_data')) || [];
    rowData.forEach((data) => {
        const rowdata_elemnent = createDataRow(data.employee_id, data.product_no, data.time_stamp, data.time_badge);
        if (rowdata_elemnent !== null) {
            edit_tableBody_element.appendChild(rowdata_elemnent);
        }
    })

})();


