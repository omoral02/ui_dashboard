export default class AppModel {
  constructor() {
    this.placeholders = [{
      parameters: {
        'case_number': 'Unify case number',
        'ip_range': '10.0.0.0/32 1234:5678::/48',
        'query_type': 'Geocoding_API_query/Place_API_details_query',
        'api_endpoint_type': 'Endpoint_Javascript_API/_Web_Service',
        'table_suffix': '20180503, last3days, latest, all',
        'project_number': '1234567891012',
        'client_id': 'gme-XXXXX',
        'date_from_YYYY_MM_DD': 'YYYY-MM-DD',
        'date_to_YYYY_MM_DD': 'YYYY-MM-DD',
        'api_key': 'AIzaSy***********',
        'table_column': 'QPS column in logs.web_service_qps.all- "places"',
        'domain': 'domain.com',
        'url': 'domain.com/path',
      },
    }];
    this.views = {};
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
