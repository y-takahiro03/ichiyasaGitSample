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