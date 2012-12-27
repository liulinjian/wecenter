var ATTACH_ACCESS_KEY
var ITEM_IDS;
var COMMENT_UNFOLD;
var QUESTION_ID;
var UNINTERESTED_COUNT;

$(document).ready(function () {
	if ($('#c_log_list').attr('id'))
	{
		bp_more_load(G_BASE_URL + '/question/ajax/log/id-' + QUESTION_ID, $('#bp_log_more'), $('#c_log_list'));
	}
	else
	{
		ITEM_IDS = ITEM_IDS.split(',');
	
		if ($("#captcha").attr('id'))
		{
			$("#captcha").click();
		}
		
		init_fileuploader('file_uploader_answer', G_BASE_URL + '/publish/ajax/attach_upload/id-answer__attach_access_key-' + ATTACH_ACCESS_KEY);
		
		// 折叠回复
		$.each($('div.answers_list'), function (i, e) {
			if ($(this).attr('uninterested_count') >= UNINTERESTED_COUNT || $(this).attr('force_fold') == 1)
			{
				$('#uninterested_answers_list').append('<div class="S_module q_replytxt answers_list">' + $(e).html() + '</div>');
				
				$(e).remove();
			}
		});
		
		if ($('#uninterested_answers_list div.answers_list').length > 0)
		{
			$('#load_uninterested_answers span.hide_answers_count').html($('#uninterested_answers_list div.answers_list').length);
			$('#load_uninterested_answers').fadeIn();
		}
		
		// 自动保存草稿
		if ($('textarea#question_detail').attr('id'))
		{
			$('textarea#question_detail').bind('blur', function() {
				if ($(this).val() != '')
				{
					$.post(G_BASE_URL + '/account/ajax/save_draft/item_id-' + QUESTION_ID + '__type-answer', 'message=' + $(this).val(), function (result) {
						$('#answer_content_message').html(result.err + ' <a href="#" onclick="$(\'textarea#question_detail\').attr(\'value\', \'\'); delete_draft(QUESTION_ID, \'answer\'); $(this).parent().html(\' \'); return false;">' + _t('删除草稿') + '</a>');
					}, 'json');
				}
			});
			
			$('#question_replay_submit').click(function () {
				$('textarea#question_detail').unbind('blur');
			});
		}
		
		if (COMMENT_UNFOLD == '1' || COMMENT_UNFOLD == 'all')
		{
			toggle_comments(QUESTION_ID, 'question');
		}
		
		// 回复高亮
		$.each(ITEM_IDS, function (i, answer_id) {
			if (COMMENT_UNFOLD == '2' || COMMENT_UNFOLD == 'all')
			{
				toggle_comments(answer_id, 'answer');
			}
			
			hightlight($('#answer_list_' + answer_id), 'i_color_bg');
		});
	}
	
	// 关注用户列表
	$.get(G_BASE_URL + '/question/ajax/get_focus_users/question_id-' + QUESTION_ID, function (data) {
		$.each(data, function (i, d) {
			if (d['uid'])
			{
				$('#focus_users').append('<a href="' + d['url'] + '" class="i_imgforUser"><img src="' + d['avatar_file'] + '"  class="user_msg" data-message="&uid='+d['uid']+'&card=user" alt="' + d['user_name'] + '" /></a>');
			}
			else
			{
				$('#focus_users').append('<a href="javascript:;" title="' + _t('匿名用户') + '" class="i_imgforUser"><img src="' + d['avatar_file'] + '" alt="' + _t('匿名用户') + '" /></a>');
			}
		});
	}, 'json');
	
	$('textarea#question_detail').bind('keypress', function(e) {
		e = e ? e : window.event;
		
		if (e.ctrlKey && e.keyCode == 13 || e.ctrlKey && e.keyCode == 10)
		{
			$('#question_replay_submit').click();
		}
	});

    $('#question_detail').markItUp(myMarkdownSettings);
    $('.markItUpButton10 a').addClass('cur');
});

function answer_force_fold(answer_id, element)
{
	$.post(G_BASE_URL + '/question/ajax/answer_force_fold/', 'answer_id=' + answer_id, function (result) {
		
		if (result.errno != 1)
		{
			$.alert(result.err);
		}
		else if (result.errno == 1)
		{
			if (result.rsm.action == 'fold')
			{
				$(element).html(_t('撤消折叠'));
			}
			else
			{
				$(element).html(_t('折叠'));
			}
		}
	}, 'json');
}