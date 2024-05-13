<table class="table table-striped table-hover table-bordered">
    <thead>
        <tr>
            <th scope="col">{{ __('The name of the subsection') }}</th>
            <th scope="col">{{ __('The address link to the subsection') }}</th>
        </tr>
    </thead>
    <tbody>
        @foreach($map as $value)
            <tr>
                <td>{{ $value['name'] }}</td>
                <td>
                    <a href="{{ $value['url'] }}">{{ $value['url'] }}</a>
                </td>
            </tr>
        @endforeach
    </tbody>
    <tfoot>
        <tr>
            <td colspan="2">{{ __('Total') }}: {{ count($map) }}</td>
        </tr>
    </tfoot>
</table>
