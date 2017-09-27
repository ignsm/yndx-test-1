"use srtict";

class Route {
  /**
   * Получаем JSON с данными
   * JSON отлично подходит для хранения такого типа данных, используется в REST-сервисах
   */
  constructor(data) {
    this.data = data;
  }

  /**
   * @description Функция для сортировки полученных точек
   * @param {array} Массив точек, по умолчанию полученная data
   * @return {array} Возвращаем массив отсортированных точек
   */
  getSortedWay(arr = this.data) {
    let data = arr.slice(),
      newRoute = [],
      duration = data.length;

    newRoute.push(data.shift());

    while (newRoute.length < duration) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].from == newRoute[newRoute.length - 1].to) {
          newRoute.push(data[i]);
          data.splice(i, 1);
        } else if (data[i].to == newRoute[0].from) {
          newRoute.unshift(data[i]);
          data.splice(i, 1);
        }
      }
    }

    return newRoute;
  }

  /**
   * @description Функция-генератор словесного описания
   * @param {array} Массив точек, по умолчанию результат getSortedWay()
   * @return {array} Возвращаем массив с готовыми фразами
   */
  generateWayPoints(arr = this.getSortedWay()) {
    let points = arr,
      phrases = [];
    /** Генерируем фразы для каждой из точек */
    points.forEach(point => {
      switch (point.transport_type) {
        case "flight":
          phrases.push(
            `From ${point.from}, take flight ${point.transport_num} to ${point.to}.
             Gate ${point.gate}. Seat ${point.seat}. ${point.comment}.`
          );
          break;
        case "train":
          phrases.push(
            `Take ${point.transport_type} ${point.transport_num} from ${point.from} to ${point.to}.
             Seat ${point.seat}.`
          );
          break;
        default:
          phrases.push(
            `Take ${point.transport_type} from ${point.from} to ${point.to}.
             ${point.seat.length > 0
               ? `Seat ${point.seat}`
               : `No seat assignment`}.`
          );
      }
    });
    return phrases;
  }
  /**
   * @description Функция для теста вывода итогового маршрута
   * Выводит в html документ в виде тегов <p>
   */
  renderWay() {
    let phrases = this.generateWayPoints();
    phrases.forEach(phrase => {
      document.write(
        `<p>
          ${phrase}
        </p>`
      );
    });
  }
}

let example = new Route(data);

example.renderWay();
