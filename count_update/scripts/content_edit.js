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

            // ローカルストレージから既存のデータを取得し配列にする
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

                // 新しいデータのオブジェクトをつくる
                const new_data = {
                    employee_id: employee_id,
                    product_no: product_no,
                    time_stamp: time_stamp
                };

                // 配列に新しく作ったデータをプッシュする
                stored_data.push(new_data);

                // データをローカルストレージに保存  key product_data value stored_data[{},{},{}]
                localStorage.setItem('product_data', JSON.stringify(stored_data));
                console.log(`Data saved: ${employee_id}, ${product_no}, ${time_stamp}`);
            } else {
                console.log(`Product number ${product_no} already exists, not saved.`);
            }
        } // saveProduct()
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
    // prev_button.style = "margin:0 0.5rem; color:#fff; background-color:#145d8a; border-color:  transparent;border-radius:2px;";
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
    // next_button.style = "margin:0 0.5rem; color:#fff; background-color:#145d8a; border-color: transparent;border-radius:2px;";
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

    /*-----------------HTML要素にスタイルを充てる-----------------*/
   

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

            let getTime = timeObject.time_stamp;
            let hour = (new Date(getTime).getHours());

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
})();


