export default class AppModel {
  constructor() {
    this.placeholders = [{
      parameters: {
        case_number: 'Unify case number',
        ip_range: '10.0.0.0/32 1234:5678::/48',
        query_type: 'GEOCODING_API_QUERY / PLACE_API_DETAILS_QUERY',
        api_endpoint_type: 'ENDPOINT_JAVASCRIPT_API / ENDPOINT_WEB_SERVICE',
        table_suffix: '20180503, last3days, latest, all',
        project_number: '1234567891012',
        client_id: 'gme-XXXXX',
        project_number: 'my-project1234343',
        date_from: 'YYYY-MM-DD',
        date_to: 'YYYY-MM-DD',
        api_key: 'AIzaSy***********',
        table_column: 'QPS column in logs.web_service_qps.all- "places"',
        domain: 'domain.com',
        url: 'domain.com/path',
      },
    }];
    this.views = {};
    this.listOfElementsByClass = [{
      classArrays : [{
          classList_1 : [],
          classList_2 : [],
          classList_3 : [],
          classList_4 : [],
          classList_5 : [],
          classList_6 : [],
          classList_7 : [],
          classList_8 : [],
      }]
    }];
    
  }

  resetChildViews () {
    this.views.non_iretableViews = null;
    this.views.iterable_views = [];
  }

  getChildViews () {
    return this.views.iterable_views;
  }

  setNewChildView (view) {
    this.views.iterable_views.push(view);
  }

  getClassList () {
    return this.listOfElementsByClass[0];
  }

  getClassListValues () { 
    return Object.valueOf(this.listOfElementsByClass[0].classArrays);;
  }

  getClassListKeys () {
    return Object.keys(this.listOfElementsByClass[0].classArrays);
  }

  getFieldSamples () {
    return this.placeholders;
  }

  getParametersList () {
    return this.placeholders[0];
  }

  getParameterValues () {
    return Object.valueOf(this.placeholders[0].parameters);
  }
  
  getParameterKeys () {
    return Object.keys(this.placeholders[0].parameters);
  }
}
