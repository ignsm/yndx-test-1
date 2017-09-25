class Route {
  /**
   * Получаем JSON с данными
   * JSON отлично подходит для хранения такого типа данных, используется в REST-сервисах
   */
  constructor(data) {
    this.data = data;
  }

  /** Функция для сортировки полученных точек */
  getSortedWay() {
    let data = this.data.slice(),
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

    /** Возвращаем массив отсортированных точек */
    return newRoute;
  }

  /** Функция-генератор словесного описания */
  generateWayPoints() {
    let points = this.getSortedWay(),
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
    /** Возвращаем массив с готовыми фразами */
    return phrases;
  }
  /**
   * Функция для вывода итогового маршрута
   * Для примера выводим в документ
   */
  renderWay(tagName) {
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
