// データを保存する
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