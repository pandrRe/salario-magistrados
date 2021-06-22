function DOM() {
    function animatedNumber(elementQuery, value, step = 0.5, ms = 10) {
        let count = 0;
        let maxValue = value;
        let rolling = false;
        let interval = null;

        let isInteger = step % 1 === 0 && value % 1 === 0;

        const element = document.querySelector(elementQuery);

        function stopRolling() {
            rolling = false;
            clearInterval(interval);
        }

        function startRolling() {
            rolling = true;
            interval = setInterval(() => {
                count += step;
                if (count + step > maxValue) {
                    element.textContent = isInteger? maxValue: maxValue.toFixed(2);
                    stopRolling();
                }
                else {
                    element.textContent = isInteger? count : count.toFixed(2);
                }
            }, ms);
        }

        function feed(value) {
            isInteger = maxValue % 1 === 0;
            maxValue = value;
            if (maxValue > count && rolling == false) {
                startRolling();
            }
        }

        return { feed };
    }

    return { animatedNumber };
}

export { DOM };