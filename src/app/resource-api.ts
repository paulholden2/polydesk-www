import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';

export abstract class ResourceApi {

  constructor(protected httpClient: HttpClient) { }

  abstract resourceName(): string;

  index(offset, limit, query) {
    let params = new HttpParams().set('page[offset]', offset).set('page[limit]', limit);

    const hashParams = [
    ];

    const arrayParams = [
      'filter',
      'sort'
    ]

    for (let param of hashParams) {
      const hash = query[param] || {};
      for (let key in hash) {
        params = params.append(`${param}[${key}]`, hash[key]);
      }
    }

    for (let param of arrayParams) {
      const array = query[param] || [];
      for (let val of array) {
        params = params.append(`${param}[]`, val);
      }
    }

    let paramObj = {};

    params.keys().forEach(key => {
      paramObj[key] = params.getAll(key);
    });

    // Handle generate expressions (need to be encoded completely, not
    // partially like Angular does by default with all query param values)
    const generators = query['generate'];

    if (!!generators) {
      // paramObj['generate'] = {};
      Object.keys(generators).forEach(key => {
        paramObj[`generate[${encodeURIComponent(key)}]`] = encodeURIComponent(generators[key]);
      });
    }

    return this.httpClient.get(this.resourceName(), { params: paramObj });
  }

}
